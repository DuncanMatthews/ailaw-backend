import React from 'react'

export default function CasesDetailsSkeleton() {
  return (
    <div className="space-y-6">
    <div className="border border-gray-300 p-4 rounded-md shadow-md">
      {/* Case Number */}
      <h2 className="text-xl font-bold mb-2">Case Number</h2>
      {/* Summary */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold mb-1">Summary</h3>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      {/* Judgment */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold mb-1">Judgment</h3>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      {/* Legal Issues */}
      <div className="mb-2">
        <h3 className="text-lg font-semibold mb-1">Legal Issues</h3>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
      {/* Keywords */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Keywords</h3>
        <div className="flex space-x-2">
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Keyword1</span>
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Keyword2</span>
          {/* Add more spans for other keywords */}
        </div>
      </div>
    </div>
  </div>
  )
}
