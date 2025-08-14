"use client"

import { Button } from "@/components/ui/button"
import { Menu, Plus } from "lucide-react"

interface HeaderProps {
  title: string
  showAddButton?: boolean
  onAddClick?: () => void
  onMenuClick?: () => void
}

export function Header({ 
  title, 
  showAddButton = false, 
  onAddClick,
  onMenuClick 
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        
        {showAddButton && (
          <Button
            size="sm"
            onClick={onAddClick}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        )}
      </div>
    </header>
  )
}