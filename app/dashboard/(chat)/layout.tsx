import {SidebarDesktop}  from "@/components/sidebar-desktop"
import { Suspense } from 'react';

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative bg-[black] flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <Suspense fallback={<div>Loading Sidebar...</div>}>
        <SidebarDesktop />
      </Suspense>
      {children}
    </div>
  )
}
