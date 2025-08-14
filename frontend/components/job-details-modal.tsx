"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { JobApplicationForm } from "./job-application-form"
import { X, MapPin, DollarSign, Calendar, ExternalLink, Edit, Clock, Building, FileText } from "lucide-react"

interface JobDetailsModalProps {
  job: any
  onClose: () => void
  onUpdate: (updates: any) => void
}

const statusColors = {
  applied: "bg-primary/10 text-primary border-primary/20",
  interview: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  offer: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
}

const priorityColors = {
  low: "bg-muted/50 text-muted-foreground",
  medium: "bg-chart-4/10 text-chart-4",
  high: "bg-destructive/10 text-destructive",
}

export function JobDetailsModal({ job, onClose, onUpdate }: JobDetailsModalProps) {
  const [showEditForm, setShowEditForm] = useState(false)

  const handleEdit = (updatedData: any) => {
    onUpdate(updatedData)
    setShowEditForm(false)
  }

  if (showEditForm) {
    return <JobApplicationForm initialData={job} onSubmit={handleEdit} onCancel={() => setShowEditForm(false)} />
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex-1">
            <CardTitle className="font-sans text-xl mb-2">{job.position}</CardTitle>
            <p className="text-lg text-muted-foreground font-mono">{job.company}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center gap-3">
            <Badge className={statusColors[job.status as keyof typeof statusColors]}>{job.status}</Badge>
            <Badge variant="outline" className={priorityColors[job.priority as keyof typeof priorityColors]}>
              {job.priority} priority
            </Badge>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">{job.location || "Not specified"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">{job.salary || "Not specified"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">Applied {new Date(job.appliedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Building className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">Source: {job.source || "Not specified"}</span>
            </div>
          </div>

          {job.deadline && (
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
            </div>
          )}

          <Separator />

          {/* Notes */}
          {job.notes && (
            <div>
              <h3 className="font-semibold mb-2 font-sans flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Notes
              </h3>
              <p className="text-sm text-muted-foreground font-mono bg-muted/50 p-3 rounded-lg">{job.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={() => setShowEditForm(true)} className="flex-1 shine-effect glow-on-hover">
              <Edit className="w-4 h-4 mr-2" />
              Edit Application
            </Button>
            {job.url && (
              <Button variant="outline" onClick={() => window.open(job.url, "_blank")} className="flex-1 glow-on-hover">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Job Posting
              </Button>
            )}
          </div>

          {/* Quick Status Updates */}
          <div>
            <h3 className="font-semibold mb-3 font-sans">Quick Status Update</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["applied", "interview", "offer", "rejected"].map((status) => (
                <Button
                  key={status}
                  variant={job.status === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => onUpdate({ status })}
                  className="capitalize glow-on-hover"
                  disabled={job.status === status}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
