"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Briefcase, BarChart3, Users, Settings, Menu, X } from "lucide-react"

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", badge: null },
  { icon: Briefcase, label: "Applications", href: "/applications", badge: "24" },
  { icon: BarChart3, label: "Analytics", href: "/analytics", badge: null },
  { icon: Users, label: "Contacts", href: "/contacts", badge: "15" },
  { icon: Settings, label: "Settings", href: "/settings", badge: null },
]

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="glow-on-hover">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow-on-hover">
                  <Briefcase className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-bold font-sans">JobTracker Pro</h2>
                  <p className="text-xs text-muted-foreground font-mono">Mobile Menu</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 p-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="w-full justify-start h-14 px-4 shine-effect glow-on-hover"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-4" />
                    <span className="flex-1 text-left font-sans">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 font-mono">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="text-center text-xs text-muted-foreground font-mono">
                <p>Stay organized, land your dream job</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
