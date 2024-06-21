import React from 'react';

type Event = {
  case_number: string;
  summary: string;
  judgment: string;
  legal_issues: string;
  keywords: string;
};

type EventsSkeletonProps = {
  events: Event[];
};

const CaseDetails: React.FC<EventsSkeletonProps> = ({ events }: EventsSkeletonProps) => {
  console.log('skeleton reached');
  return (
    <div className="space-y-6 dark:bg-black dark:text-gray-100">
      {events.map((event) => (
        <div
          key={event.case_number}
          className="rounded-lg border border-gray-300 bg-[#1d1e23] p-6 shadow-md dark:border-gray-700 dark:bg-[#121111]"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="md:text-xl font-bold text-gray-100 dark:text-gray-100">
              Case Number: {event.case_number}
            </h2>
            <span className="rounded-full bg-[#6905e9] px-3 py-1 text-sm font-semibold text-white">
              {event.keywords.split(',')[0].trim()} {/* Display the first keyword */}
            </span>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 md:text-2xl font-semibold text-gray-200 dark:text-gray-200">
              Summary
            </h3>
            <p className="text-gray-300 md:text-xl text-sm dark:text-gray-300">{event.summary}</p>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 md:text-xl font-semibold text-gray-200 dark:text-gray-200">
              Judgment
            </h3>
            <p className="text-gray-300 md:text-xl text-sm dark:text-gray-300">{event.judgment}</p>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 md:text-xl font-semibold text-gray-200 dark:text-gray-200">
              Legal Issues
            </h3>
            <p className="text-gray-300 dark:text-gray-100">{event.legal_issues}</p>
          </div>
          <div>
            <h3 className="mb-2 md:text-xl font-semibold text-gray-200 dark:text-gray-200">
              Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {event.keywords.split(',').map((keyword: string, index: number) => (
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
  );
};

export default CaseDetails;
