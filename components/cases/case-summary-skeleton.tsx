import React from 'react'

export default function CaseSummarySkeleton() {
  return (
    <div className="flex flex-col space-y-4">
  {/* Placeholder for Case 1 */}
  <div className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition duration-200 ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 animate-pulse">
    <div className="flex flex-col justify-center">
      <div className="h-8 w-1/3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="mt-2 h-4 w-2/3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
  </div>

  {/* Placeholder for Case 2 */}
  <div className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition duration-200 ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 animate-pulse">
    <div className="flex flex-col justify-center">
      <div className="h-8 w-1/3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="mt-2 h-4 w-2/3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
  </div>
  <div className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition duration-200 ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 animate-pulse">
    <div className="flex flex-col justify-center">
      <div className="h-8 w-1/3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="mt-2 h-4 w-2/3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
  </div>
  <div className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition duration-200 ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 animate-pulse">
    <div className="flex flex-col justify-center">
      <div className="h-8 w-1/3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      <div className="mt-2 h-4 w-2/3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
    </div>
  </div>

  <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
    Note: Data and latency are simulated for illustrative purposes.
  </div>
</div>
  )
}
