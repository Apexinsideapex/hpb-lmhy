"use client"

import { ReactNode } from "react"
import { Header } from "./header"
import { MobileNav } from "./mobile-nav"

interface MainLayoutProps {
  children: ReactNode
  title: string
  showAddButton?: boolean
  onAddClick?: () => void
}

export function MainLayout({ 
  children, 
  title, 
  showAddButton = false, 
  onAddClick 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={title} 
        showAddButton={showAddButton}
        onAddClick={onAddClick}
      />
      
      <main className="pb-20 md:pb-4">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {children}
        </div>
      </main>
      
      <MobileNav />
    </div>
  )
}