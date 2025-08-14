"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KanbanJobCard } from "./kanban-job-card"
import { Plus, Target, Clock, CheckCircle, XCircle } from "lucide-react"

interface KanbanBoardProps {
  jobs: any[]
  onUpdateJob: (jobId: string, updates: any) => void
  onViewJob: (job: any) => void
  onAddJob: () => void
}

const columns = [
  {
    id: "applied",
    title: "Applied",
    icon: Target,
    color: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-primary/20",
  },
  {
    id: "interview",
    title: "Interview",
    icon: Clock,
    color: "text-chart-4",
    bgColor: "bg-chart-4/5",
    borderColor: "border-chart-4/20",
  },
  {
    id: "offer",
    title: "Offer",
    icon: CheckCircle,
    color: "text-chart-3",
    bgColor: "bg-chart-3/5",
    borderColor: "border-chart-3/20",
  },
  {
    id: "rejected",
    title: "Rejected",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-destructive/20",
  },
]

export function KanbanBoard({ jobs, onUpdateJob, onViewJob, onAddJob }: KanbanBoardProps) {
  const [draggedJob, setDraggedJob] = useState<any>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, job: any) => {
    setDraggedJob(job)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverColumn(columnId)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    if (draggedJob && draggedJob.status !== columnId) {
      onUpdateJob(draggedJob.id, { status: columnId })
    }
    setDraggedJob(null)
    setDragOverColumn(null)
  }

  const getJobsByStatus = (status: string) => {
    return jobs.filter((job) => job.status === status)
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-6">
      {columns.map((column) => {
        const columnJobs = getJobsByStatus(column.id)
        const isDropTarget = dragOverColumn === column.id
        const ColumnIcon = column.icon

        return (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card
              className={`h-full ${column.bgColor} ${column.borderColor} border-2 transition-all duration-200 ${
                isDropTarget ? "ring-2 ring-primary/50 scale-[1.02]" : ""
              }`}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between font-sans">
                  <div className="flex items-center gap-2">
                    <ColumnIcon className={`w-5 h-5 ${column.color}`} />
                    <span>{column.title}</span>
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    {columnJobs.length}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 min-h-[400px]">
                {columnJobs.map((job) => (
                  <KanbanJobCard
                    key={job.id}
                    job={job}
                    onDragStart={(e) => handleDragStart(e, job)}
                    onView={() => onViewJob(job)}
                    isDragging={draggedJob?.id === job.id}
                  />
                ))}

                {columnJobs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <ColumnIcon className={`w-8 h-8 ${column.color} mx-auto mb-2 opacity-50`} />
                    <p className="text-sm font-mono">No applications yet</p>
                  </div>
                )}

                {column.id === "applied" && (
                  <Button
                    variant="ghost"
                    className="w-full border-2 border-dashed border-muted-foreground/30 h-20 shine-effect glow-on-hover"
                    onClick={onAddJob}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Application
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
