
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
import { EventsSkeleton } from '@/components/stocks/events-skeleton'
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
} from '@/components/stocks/message'

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

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
      SELECT 
        case_number, 
        summary, 
        judgment, 
        legal_issues, 
        keywords, 
        cosine_similarity(embedding, ${vectorQuery}::float8[]) AS similarity
      FROM 
        cases
      ORDER BY 
        cosine_similarity(embedding, ${vectorQuery}::float8[]) DESC
      LIMIT 8;
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
  const embedding = await generateEmbedding(content)
  const similarCases = await findSimilarCases(embedding)

  console.log(similarCases)

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

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    initial: <SpinnerMessage />,
    system: `
    You are a legal assistant conversation bot, helping users find relevant court cases based on the provided context. The context contains similar cases stored in the similarCases variable.
    
    Context:
    ${JSON.stringify(similarCases, null, 2)}
    
    You and the user can discuss case details, and the user can request more information about the similar cases. Use the context to provide relevant information and assist the user in finding the most suitable case.
    
    Messages inside [] mean that it's a UI element or a user event. For example:
    - "[Case details for 12099/2007]" means that an interface showing the details of case 12099/2007 is shown to the user.
    - "[User has requested more information on legal issues]" means that the user has requested more information on the legal issues in the UI.
    
    If the user requests details about a specific case, call \`show_case_details\` to show the case details UI.
    If the user just wants a summary of a case, call \`show_case_summary\` to show the summary.
    If you want to show the list of similar cases, call \`list_cases\`.
   If you want to search for cases, call \`list_cases\`.

    
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
        description:
          'list the cases from context. If theres no cases reply truthfull that theres no ',
    
        parameters: z.object({
          similarCases: z.array(
            z.object({
              case_number: z.string().describe('The case number'),
              summary: z.string().describe('The summary of the case'),
              judgment: z.string().describe('The judgment of the case'),
              legal_issues: z
                .string()
                .describe('The legal issues involved in the case'),
              keywords: z.string().describe('The keywords related to the case')
            })
          )
        }),
    
        generate: async ({ similarCases }) => {
          const formattedCases = similarCases.map(caseItem => ({
            case_number: caseItem.case_number,
            summary: caseItem.summary,
            judgment: caseItem.judgment,
            legal_issues: caseItem.legal_issues,
            keywords: caseItem.keywords
          }))
    
          await sleep(1000)
    
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
              <EventsSkeleton events={formattedCases} />
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

export type AIState = {
  chatId: string
  messages: Message[]
}

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
  initialAIState: { chatId: nanoid(), messages: [] },

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
            return tool.toolName === 'listStocks' ? (
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
