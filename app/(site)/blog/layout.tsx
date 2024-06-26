import SidebarLink from '@/components/Docs/SidebarLink'
import React from 'react'

export default function BlogLayout({ children }) {
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
