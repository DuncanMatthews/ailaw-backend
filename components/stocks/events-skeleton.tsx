import React from 'react'

type Event = {
  case_number: string
  summary: string
  judgment: string
  legal_issues: string
  keywords: string
}

type EventsSkeletonProps = {
  events: Event[]
}

export const EventsSkeleton: React.FC<EventsSkeletonProps> = ({ events }) => {
  return (
    <div className="space-y-6 dark:bg-black dark:text-gray-100">
      {events.map(event => (
        <div
          key={event.case_number}
          className="rounded-lg border border-gray-300 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-[#121111]  "
        >
          <div className="mb-4 flex  items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Case Number: {event.case_number}
            </h2>
            <span className="rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white">
             {/* {event.keywords[0]} */}
            </span>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Summary
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{event.summary}</p>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Judgment
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{event.judgment}</p>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Legal Issues
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {event.legal_issues}
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
              Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {event.keywords.split(',').map((keyword, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-[#30313a] dark:text-gray-100"
                >
                  {keyword.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
