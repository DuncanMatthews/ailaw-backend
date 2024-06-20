'use client'

import { useActions, useUIState } from 'ai/rsc'
import { AI } from '@/lib/chat/actions'

interface CaseSummary {
  case_number: string
  summary: string
  judgment: string
  legal_issues: string
  keywords: string
}

export function CasesSummary({ props: cases }: { props: CaseSummary[] }) {
  const [, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()

  return (
    <div className="flex flex-col space-y-4">
      {cases.map(caseSummary => (
        <button
          key={caseSummary.case_number}
          className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition duration-200 ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          onClick={async () => {
            const response = await submitUserMessage(`View case ${caseSummary.case_number}`)
            setMessages(currentMessages => [...currentMessages, response])
          }}
        >
          <div className="flex flex-col justify-center">
            <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Case {caseSummary.case_number}
            </div>
            <div className="mt-2 text-xl text-gray-600 dark:text-gray-300">
              {caseSummary.summary.substring(0, 100)}...
            </div>
          </div>
        </button>
      ))}
      <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Note: Data and latency are simulated for illustrative purposes.
      </div>
    </div>
  )
}
