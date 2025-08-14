"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Building } from "lucide-react"

// Mock contacts data
const mockContacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@google.com",
    role: "Engineering Manager",
    company: "Google",
    jobTitle: "Software Engineer",
    notes: "Very friendly, asked about React experience"
  },
  {
    id: "2", 
    name: "Mike Chen",
    email: "m.chen@meta.com",
    role: "Senior Recruiter",
    company: "Meta", 
    jobTitle: "Frontend Developer",
    notes: "Mentioned team is growing rapidly"
  }
]

export default function ContactsPage() {
  const handleAddContact = () => {
    console.log("Add new contact")
  }

  return (
    <MainLayout title="Contacts" showAddButton onAddClick={handleAddContact}>
      <div className="space-y-4">
        {mockContacts.map((contact) => (
          <Card key={contact.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{contact.name}</h3>
                <p className="text-gray-600">{contact.role}</p>
              </div>
              <Badge variant="outline">
                {contact.company}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                {contact.jobTitle}
              </div>
              {contact.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {contact.email}
                </div>
              )}
            </div>
            
            {contact.notes && (
              <div className="bg-gray-50 p-3 rounded text-sm mb-3">
                <p className="font-medium text-gray-700 mb-1">Notes:</p>
                <p className="text-gray-600">{contact.notes}</p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-1" />
                Email
              </Button>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </Card>
        ))}
        
        {mockContacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No contacts added yet</p>
            <Button onClick={handleAddContact}>Add Your First Contact</Button>
          </div>
        )}
      </div>
    </MainLayout>
  )
}