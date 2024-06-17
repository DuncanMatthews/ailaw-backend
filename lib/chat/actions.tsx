
'use server'
import { sql as db } from '@vercel/postgres'
import { GoogleGenerativeAI } from '@google/generative-ai'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import { z } from 'zod'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'

import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'
import {
  BotCard,
  BotMessage,
  SpinnerMessage,
  UserMessage
} from '@/components/cases/message'
import CaseDetails from '@/components/cases/case-details'
import CaseDetailsSkeleton from '@/components/cases/cases-details-skeleton'

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)
const uiStream = createStreamableUI();


async function generateEmbedding(messages: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'embedding-001' })
    const embedding = await model.embedContent(messages)
    return embedding.embedding.values
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw error
  }
}

async function findSimilarCases(embedding: number[]): Promise<any[]> {
  const vectorQuery = `{${embedding.join(',')}}`

  try {
    const result = await db`
    WITH top_cases AS (
  SELECT 
      case_number, 
      cosine_similarity(embedding, ${vectorQuery}::float8[]) AS similarity
  FROM 
      cases
  ORDER BY 
      cosine_similarity(embedding, ${vectorQuery}::float8[]) DESC
  LIMIT 1
)
SELECT 
  c.case_number,
  c.court,
  c.division,
  c.date,
  c.summary,
  c.judgment,
  c.legal_issues,
  c.keywords,
  c.case_type,
  c.full_text,
  c.jurisdiction,
  c.ratio_decidendi,
  tc.similarity,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('name', p.name, 'role', p.role)) FILTER (WHERE p.name IS NOT NULL), '[]'::jsonb)::text AS participants,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('description', ch.description, 'verdict', ch.verdict, 'sentence', ch.sentence)) FILTER (WHERE ch.description IS NOT NULL), '[]'::jsonb)::text AS charges,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('judge_name', jo.judge_name, 'opinion_type', jo.opinion_type, 'key_points', jo.key_points)) FILTER (WHERE jo.judge_name IS NOT NULL), '[]'::jsonb)::text AS judges_opinions,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('court', ph.court, 'date', ph.date, 'outcome', ph.outcome)) FILTER (WHERE ph.court IS NOT NULL), '[]'::jsonb)::text AS procedural_history,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('party', pa.party, 'argument', pa.argument)) FILTER (WHERE pa.party IS NOT NULL), '[]'::jsonb)::text AS parties_arguments,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('evidence', ke.evidence)) FILTER (WHERE ke.evidence IS NOT NULL), '[]'::jsonb)::text AS key_evidence,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('dictum', od.dictum)) FILTER (WHERE od.dictum IS NOT NULL), '[]'::jsonb)::text AS obiter_dicta,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('cited_case_number', cc.cited_case_number, 'relevance', cc.relevance)) FILTER (WHERE cc.cited_case_number IS NOT NULL), '[]'::jsonb)::text AS cited_cases,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('act_name', cl.act_name, 'section', cl.section, 'relevance', cl.relevance)) FILTER (WHERE cl.act_name IS NOT NULL), '[]'::jsonb)::text AS cited_legislation,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('reference_type', cr.reference_type, 'citation', cr.citation)) FILTER (WHERE cr.reference_type IS NOT NULL), '[]'::jsonb)::text AS case_references,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('treatment', st.treatment)) FILTER (WHERE st.treatment IS NOT NULL), '[]'::jsonb)::text AS subsequent_treatment,
  COALESCE(jsonb_agg(DISTINCT jsonb_build_object('remark', sr.remark)) FILTER (WHERE sr.remark IS NOT NULL), '[]'::jsonb)::text AS sentencing_remarks
FROM 
  top_cases tc
  JOIN cases c ON tc.case_number = c.case_number
  LEFT JOIN participants p ON tc.case_number = p.case_number
  LEFT JOIN charges ch ON tc.case_number = ch.case_number
  LEFT JOIN judges_opinions jo ON tc.case_number = jo.case_number
  LEFT JOIN procedural_history ph ON tc.case_number = ph.case_number
  LEFT JOIN parties_arguments pa ON tc.case_number = pa.case_number
  LEFT JOIN key_evidence ke ON tc.case_number = ke.case_number
  LEFT JOIN obiter_dicta od ON tc.case_number = od.case_number
  LEFT JOIN cited_cases cc ON tc.case_number = cc.case_number
  LEFT JOIN cited_legislation cl ON tc.case_number = cl.case_number
  LEFT JOIN case_references cr ON tc.case_number = cr.case_number
  LEFT JOIN subsequent_treatment st ON tc.case_number = st.case_number
  LEFT JOIN sentencing_remarks sr ON tc.case_number = sr.case_number
GROUP BY 
  c.case_number,
  c.court,
  c.division,
  c.date, 
  c.summary,
  c.judgment,
  c.legal_issues,
  c.keywords,
  c.case_type,
  c.full_text,
  c.jurisdiction,
  c.ratio_decidendi,
  tc.similarity
ORDER BY 
  tc.similarity DESC;
    `
    return result.rows
  } catch (error) {
    console.error('Error finding similar cases:', error)
    throw error
  }
}

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()
  console.log("content", )



  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  const context = aiState.get().currentCases
  console.log("context",context)

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    initial: <SpinnerMessage />,
    system: `
    You are a legal assistant conversation bot, helping users find relevant court cases based on the provided context. The context contains similar cases stored in the similarCases variable.
    
    Context:
    ${context}
    
    You and the user can discuss case details, and the user can request more information about the case. 
    
    If you want to show the list of similar cases, call \`list_cases\`.
   
    If you want to search for cases, call \`list_cases\`.

    If you want to list a case call \`list_case\`.

    
    Important: Only provide information that is present in the context. If the information is not available in the context, respond with "There is no information available on this case." Do not generate or assume any information that is not explicitly provided in the context.
    
    If the user wants to perform another action that is not supported, respond that you are a demo and cannot do that.
    
    Besides that, you can also chat with users and provide legal information based on the context if needed.
    `,

    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],

    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        if (result) {
          textStream.done()
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content
              }
            ]
          })
        } else {
          textStream.update(delta)
        }
      } else {
        textStream.update(delta)
      }

      return textNode
    },

    tools: {
      listCases: {
        description: 'List the cases from context. If there are no cases, reply truthfully that there are none.',
        parameters: z.object({
          content: z.string().describe('The embedding values for the case search')
        }),
        generate: async function* ({ content }) {
          const embedding = await generateEmbedding(content)
          const similarCases = await findSimilarCases(embedding)

          //upate state.currentCases with the similar cases

          aiState.update({
            ...aiState.get(),
            currentCases: similarCases
          })

      
          // yield (
          //   <BotCard>
          //     <CaseDetailsSkeleton events={similarCases} />
          //   </BotCard>
          // )
      
          // await sleep(1000)
      
          const toolCallId = nanoid()
      
          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'listCases',
                    toolCallId,
                    args: { similarCases }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'listCases',
                    toolCallId,
                    result: similarCases
                  }
                ]
              }
            ]
          })
      
          return (
            <BotCard>
              <CaseDetails events={similarCases} />
            </BotCard>
          )
        }
      }
      
    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

type AIState = {
  chatId: string;
  messages: Message[];
  currentCases: any[]; // Change Case to any[]
};


export type UIState = {
  id: string
  display: React.ReactNode
  
}[]

// AI State
export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [], currentCases: [] },

  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const { chatId, messages } = aiState
        const chat: Chat = {
          id: chatId,
          title: '',
          createdAt: new Date(),
          userId: session.user.id as string,
          messages,
          path: `/chat/${chatId}`
        }

        const uiState = getUIStateFromAIState(chat)
        return uiState
      }
    } else {
      return
    }
  },

  //gets the chat from the AI state and saves it to the database
  onSetAIState: async ({ state }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`

      const firstMessageContent = messages[0].content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  const { chatId, messages } = aiState
  const chat: Chat = {
    id: chatId,
    title: '',
    createdAt: new Date(),
    userId: '',
    messages,
    path: ''
  }

  return chat.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${chat.chatId}-${index}`,
      display:
        message.role === 'tool' ? (
          message.content.map(tool => {
            return tool.toolName === 'listCases' ? (
              <BotCard>
                {/* TODO: Infer types based on the tool result*/}
                Nothing
              </BotCard>
            ) : null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }))
}
