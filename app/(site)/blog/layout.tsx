import React from 'react'

export default function BlogLayout({ children }: any) {
  return (
    <div>
          <div className="md:w-1/2 lg:w-[32%]">
              {/* Sidebar content */}
              {/* ... */}
            </div>
      {children}
    </div>
  )
}
