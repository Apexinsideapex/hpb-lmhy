"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, ExternalLink } from "lucide-react"

// Mock data - replace with API calls later
const mockJobs = [
  {
    id: "1",
    company: "Google",
    position: "Software Engineer",
    location: "Mountain View, CA",
    salary: "$120,000 - $180,000",
    status: "interview",
    applicationDate: "2024-01-15",
    priority: "high"
  },
  {
    id: "2", 
    company: "Meta",
    position: "Frontend Developer",
    location: "Menlo Park, CA",
    salary: "$110,000 - $160,000",
    status: "applied",
    applicationDate: "2024-01-10",
    priority: "medium"
  }
]

const statusColors = {
  saved: "bg-gray-100 text-gray-800",
  applied: "bg-blue-100 text-blue-800", 
  interview: "bg-yellow-100 text-yellow-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
}

const priorityColors = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-orange-100 text-orange-600", 
  high: "bg-red-100 text-red-600"
}

export default function JobsPage() {
  const handleAddJob = () => {
    console.log("Add new job")
  }

  return (
    <MainLayout title="Jobs" showAddButton onAddClick={handleAddJob}>
      <div className="space-y-4">
        {mockJobs.map((job) => (
          <Card key={job.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{job.position}</h3>
                <p className="text-gray-600 font-medium">{job.company}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={statusColors[job.status as keyof typeof statusColors]}>
                  {job.status}
                </Badge>
                <Badge className={priorityColors[job.priority as keyof typeof priorityColors]}>
                  {job.priority}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {job.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Applied: {job.applicationDate}
              </div>
              {job.salary && (
                <div className="font-medium text-green-600">
                  {job.salary}
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
        
        {mockJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No jobs added yet</p>
            <Button onClick={handleAddJob}>Add Your First Job</Button>
          </div>
        )}
      </div>
    </MainLayout>
  )
}