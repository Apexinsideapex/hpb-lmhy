"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Mail, Phone, Calendar, ExternalLink, MoreVertical, Eye, Building, Briefcase } from "lucide-react"

interface ContactCardProps {
  contact: any
  viewMode: "grid" | "list"
  onView: () => void
  onUpdate: (updates: any) => void
}

const roleColors = {
  recruiter: "bg-primary/10 text-primary border-primary/20",
  manager: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  "decision-maker": "bg-chart-3/10 text-chart-3 border-chart-3/20",
  other: "bg-muted/50 text-muted-foreground",
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

const getRoleColor = (role: string) => {
  if (role.toLowerCase().includes("recruiter")) return roleColors.recruiter
  if (role.toLowerCase().includes("manager")) return roleColors.manager
  if (role.toLowerCase().includes("cto") || role.toLowerCase().includes("director")) return roleColors["decision-maker"]
  return roleColors.other
}

export function ContactCard({ contact, viewMode, onView, onUpdate }: ContactCardProps) {
  const handleQuickAction = (action: string) => {
    const today = new Date().toISOString().split("T")[0]
    onUpdate({ lastContact: today, contactMethod: action })
  }

  if (viewMode === "list") {
    return (
      <Card className="shine-effect glow-on-hover">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Avatar className="w-10 h-10 bg-primary/10">
                <AvatarFallback className="bg-transparent text-primary font-semibold">
                  {getInitials(contact.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold font-sans truncate">{contact.name}</h3>
                  <Badge className={getRoleColor(contact.role)} variant="outline">
                    {contact.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    <span className="font-mono">{contact.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    <span className="font-mono">{contact.linkedJobs.length} jobs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="font-mono">Last: {new Date(contact.lastContact).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleQuickAction("email")}>
                <Mail className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleQuickAction("phone")}>
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onView}>
                <Eye className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => window.open(`mailto:${contact.email}`)}>Send Email</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.open(`tel:${contact.phone}`)}>Call</DropdownMenuItem>
                  {contact.linkedin && (
                    <DropdownMenuItem onClick={() => window.open(contact.linkedin, "_blank")}>
                      View LinkedIn
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shine-effect glow-on-hover cursor-pointer" onClick={onView}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="w-12 h-12 bg-primary/10">
              <AvatarFallback className="bg-transparent text-primary font-semibold">
                {getInitials(contact.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold font-sans truncate">{contact.name}</h3>
              <p className="text-sm text-muted-foreground font-mono truncate">{contact.company}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => window.open(`mailto:${contact.email}`)}>Send Email</DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open(`tel:${contact.phone}`)}>Call</DropdownMenuItem>
              {contact.linkedin && (
                <DropdownMenuItem onClick={() => window.open(contact.linkedin, "_blank")}>
                  View LinkedIn
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <Badge className={getRoleColor(contact.role)} variant="outline">
            {contact.role}
          </Badge>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="font-mono truncate">{contact.email}</span>
            </div>
            {contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="font-mono">{contact.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-mono">Last contact: {new Date(contact.lastContact).toLocaleDateString()}</span>
            </div>
          </div>

          {contact.notes && (
            <div className="p-2 bg-muted/30 rounded text-xs">
              <p className="font-mono text-muted-foreground line-clamp-2">{contact.notes}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-1">
              {contact.tags.slice(0, 2).map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleQuickAction("email")
                }}
                className="h-8 w-8 p-0"
              >
                <Mail className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleQuickAction("phone")
                }}
                className="h-8 w-8 p-0"
              >
                <Phone className="w-3 h-3" />
              </Button>
              {contact.linkedin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(contact.linkedin, "_blank")
                  }}
                  className="h-8 w-8 p-0"
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
