"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { ContactCard } from "@/components/contact-card"
import { ContactForm } from "@/components/contact-form"
import { ContactDetailsModal } from "@/components/contact-details-modal"
import { Briefcase, Plus, Search, Users, Grid, List } from "lucide-react"

// Mock data - in real app this would come from API/database
const mockContacts = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Recruiter",
    company: "TechCorp",
    linkedJobs: ["1"],
    notes: "Very responsive, prefers email communication. Mentioned they're hiring for multiple positions.",
    lastContact: "2024-01-20",
    contactMethod: "email",
    tags: ["recruiter", "responsive"],
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "m.chen@startupxyz.com",
    phone: "+1 (555) 987-6543",
    role: "Engineering Manager",
    company: "StartupXYZ",
    linkedJobs: ["2"],
    notes: "Technical background, interested in discussing architecture. Mentioned potential for growth.",
    lastContact: "2024-01-18",
    contactMethod: "phone",
    tags: ["hiring-manager", "technical"],
    linkedin: "https://linkedin.com/in/mikechen",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@bigtech.com",
    phone: "+1 (555) 456-7890",
    role: "Talent Acquisition",
    company: "BigTech Inc",
    linkedJobs: ["3"],
    notes: "Handles senior positions. Mentioned they have multiple openings coming up in Q2.",
    lastContact: "2024-01-15",
    contactMethod: "linkedin",
    tags: ["recruiter", "senior-roles"],
    linkedin: "https://linkedin.com/in/emilyrodriguez",
  },
  {
    id: "4",
    name: "David Park",
    email: "david@devcompany.com",
    phone: "+1 (555) 321-0987",
    role: "CTO",
    company: "DevCompany",
    linkedJobs: ["4"],
    notes: "Direct decision maker. Very interested in my background. Offered competitive package.",
    lastContact: "2024-01-22",
    contactMethod: "email",
    tags: ["decision-maker", "offer"],
    linkedin: "https://linkedin.com/in/davidpark",
  },
]

export default function ContactsPage() {
  const [contacts, setContacts] = useState(mockContacts)
  const [showForm, setShowForm] = useState(false)
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || contact.role.toLowerCase().includes(roleFilter.toLowerCase())
    return matchesSearch && matchesRole
  })

  const handleAddContact = (contactData: any) => {
    const newContact = {
      ...contactData,
      id: Date.now().toString(),
      lastContact: new Date().toISOString().split("T")[0],
      linkedJobs: [],
    }
    setContacts([newContact, ...contacts])
    setShowForm(false)
  }

  const handleUpdateContact = (contactId: string, updates: any) => {
    setContacts(contacts.map((contact) => (contact.id === contactId ? { ...contact, ...updates } : contact)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-on-hover">
                  <Briefcase className="w-4 h-4 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold font-sans">JobTracker Pro</h1>
              </div>
              <Navigation />
            </div>

            <Button onClick={() => setShowForm(true)} className="shine-effect glow-on-hover">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold font-sans">Contacts</h2>
            <p className="text-muted-foreground font-mono">Manage your network of recruiters and hiring managers</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="glow-on-hover"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="glow-on-hover"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, company, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shine-effect"
            />
          </div>
          <div className="flex gap-2">
            {["all", "recruiter", "manager", "decision-maker"].map((role) => (
              <Button
                key={role}
                variant={roleFilter === role ? "default" : "outline"}
                size="sm"
                onClick={() => setRoleFilter(role)}
                className="capitalize glow-on-hover"
              >
                {role === "all" ? "All Roles" : role.replace("-", " ")}
              </Button>
            ))}
          </div>
        </div>

        {/* Contacts Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              viewMode={viewMode}
              onView={() => setSelectedContact(contact)}
              onUpdate={(updates) => handleUpdateContact(contact.id, updates)}
            />
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 font-sans">No contacts found</h3>
            <p className="text-muted-foreground font-mono mb-4">
              {searchTerm || roleFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Start building your professional network"}
            </p>
            <Button onClick={() => setShowForm(true)} className="shine-effect glow-on-hover">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Contact
            </Button>
          </div>
        )}
      </main>

      {/* Contact Form Modal */}
      {showForm && <ContactForm onSubmit={handleAddContact} onCancel={() => setShowForm(false)} />}

      {/* Contact Details Modal */}
      {selectedContact && (
        <ContactDetailsModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onUpdate={(updates) => {
            handleUpdateContact(selectedContact.id, updates)
            setSelectedContact({ ...selectedContact, ...updates })
          }}
        />
      )}
    </div>
  )
}
