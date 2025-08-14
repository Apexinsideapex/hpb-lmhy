"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ContactForm } from "./contact-form"
import { X, Mail, Phone, ExternalLink, Edit, Building, Briefcase, MessageSquare, Clock } from "lucide-react"

interface ContactDetailsModalProps {
  contact: any
  onClose: () => void
  onUpdate: (updates: any) => void
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

const getRoleColor = (role: string) => {
  if (role.toLowerCase().includes("recruiter")) return "bg-primary/10 text-primary border-primary/20"
  if (role.toLowerCase().includes("manager")) return "bg-chart-4/10 text-chart-4 border-chart-4/20"
  if (role.toLowerCase().includes("cto") || role.toLowerCase().includes("director"))
    return "bg-chart-3/10 text-chart-3 border-chart-3/20"
  return "bg-muted/50 text-muted-foreground"
}

export function ContactDetailsModal({ contact, onClose, onUpdate }: ContactDetailsModalProps) {
  const [showEditForm, setShowEditForm] = useState(false)

  const handleEdit = (updatedData: any) => {
    onUpdate(updatedData)
    setShowEditForm(false)
  }

  const handleQuickAction = (action: string) => {
    const today = new Date().toISOString().split("T")[0]
    onUpdate({ lastContact: today, contactMethod: action })
  }

  if (showEditForm) {
    return <ContactForm initialData={contact} onSubmit={handleEdit} onCancel={() => setShowEditForm(false)} />
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 bg-primary/10">
              <AvatarFallback className="bg-transparent text-primary font-bold text-lg">
                {getInitials(contact.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-sans text-xl mb-1">{contact.name}</CardTitle>
              <p className="text-muted-foreground font-mono">{contact.role}</p>
              <p className="text-sm text-muted-foreground font-mono">{contact.company}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">{contact.email}</span>
            </div>
            {contact.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono">{contact.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Building className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">{contact.company}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">{contact.linkedJobs.length} linked jobs</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge className={getRoleColor(contact.role)} variant="outline">
              {contact.role}
            </Badge>
            {contact.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />

          {/* Last Contact */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-mono">
                Last contact: {new Date(contact.lastContact).toLocaleDateString()}
              </span>
            </div>
            <Badge variant="outline">{contact.contactMethod}</Badge>
          </div>

          {/* Notes */}
          {contact.notes && (
            <div>
              <h3 className="font-semibold mb-2 font-sans flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Notes
              </h3>
              <p className="text-sm text-muted-foreground font-mono bg-muted/50 p-3 rounded-lg">{contact.notes}</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => {
                window.open(`mailto:${contact.email}`)
                handleQuickAction("email")
              }}
              className="glow-on-hover"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            {contact.phone && (
              <Button
                variant="outline"
                onClick={() => {
                  window.open(`tel:${contact.phone}`)
                  handleQuickAction("phone")
                }}
                className="glow-on-hover"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            )}
            {contact.linkedin && (
              <Button
                variant="outline"
                onClick={() => {
                  window.open(contact.linkedin, "_blank")
                  handleQuickAction("linkedin")
                }}
                className="glow-on-hover"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            )}
            <Button onClick={() => setShowEditForm(true)} className="shine-effect glow-on-hover">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Communication History Placeholder */}
          <div>
            <h3 className="font-semibold mb-3 font-sans">Recent Communication</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                <span className="font-mono">Email sent</span>
                <span className="text-muted-foreground font-mono">{contact.lastContact}</span>
              </div>
              <div className="text-center py-4 text-muted-foreground">
                <p className="text-sm font-mono">Communication history coming soon</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
