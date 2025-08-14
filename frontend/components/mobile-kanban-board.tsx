"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KanbanJobCard } from "./kanban-job-card"
import { Plus, Target, Clock, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react"

interface MobileKanbanBoardProps {
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

export function MobileKanbanBoard({ jobs, onUpdateJob, onViewJob, onAddJob }: MobileKanbanBoardProps) {
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0)
  const [draggedJob, setDraggedJob] = useState<any>(null)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > 50
    const isRightSwipe = distanceX < -50
    const isVerticalSwipe = Math.abs(distanceY) > Math.abs(distanceX)

    if (!isVerticalSwipe) {
      if (isLeftSwipe && currentColumnIndex < columns.length - 1) {
        setCurrentColumnIndex(currentColumnIndex + 1)
      }
      if (isRightSwipe && currentColumnIndex > 0) {
        setCurrentColumnIndex(currentColumnIndex - 1)
      }
    }
  }

  const handleDragStart = (e: React.DragEvent, job: any) => {
    setDraggedJob(job)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    if (draggedJob && draggedJob.status !== columnId) {
      onUpdateJob(draggedJob.id, { status: columnId })
    }
    setDraggedJob(null)
  }

  const getJobsByStatus = (status: string) => {
    return jobs.filter((job) => job.status === status)
  }

  const currentColumn = columns[currentColumnIndex]
  const columnJobs = getJobsByStatus(currentColumn.id)
  const ColumnIcon = currentColumn.icon

  return (
    <div className="md:hidden">
      {/* Mobile Column Navigation */}
      <div className="flex items-center justify-between mb-4 px-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentColumnIndex(Math.max(0, currentColumnIndex - 1))}
          disabled={currentColumnIndex === 0}
          className="glow-on-hover"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2">
          <ColumnIcon className={`w-5 h-5 ${currentColumn.color}`} />
          <h3 className="font-semibold font-sans">{currentColumn.title}</h3>
          <Badge variant="secondary" className="font-mono">
            {columnJobs.length}
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentColumnIndex(Math.min(columns.length - 1, currentColumnIndex + 1))}
          disabled={currentColumnIndex === columns.length - 1}
          className="glow-on-hover"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Column Indicators */}
      <div className="flex justify-center gap-2 mb-4">
        {columns.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentColumnIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentColumnIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Mobile Column Content */}
      <div
        className="touch-pan-x"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, currentColumn.id)}
      >
        <Card className={`${currentColumn.bgColor} ${currentColumn.borderColor} border-2 min-h-[500px]`}>
          <CardContent className="p-4 space-y-3">
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
              <div className="text-center py-12 text-muted-foreground">
                <ColumnIcon className={`w-12 h-12 ${currentColumn.color} mx-auto mb-4 opacity-50`} />
                <p className="text-sm font-mono">No applications yet</p>
                {currentColumn.id === "applied" && (
                  <Button onClick={onAddJob} className="mt-4 shine-effect glow-on-hover">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Application
                  </Button>
                )}
              </div>
            )}

            {currentColumn.id === "applied" && columnJobs.length > 0 && (
              <Button
                variant="ghost"
                className="w-full border-2 border-dashed border-muted-foreground/30 h-16 shine-effect glow-on-hover"
                onClick={onAddJob}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Application
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Swipe Hint */}
      <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
        Swipe left or right to navigate between columns
      </p>
    </div>
  )
}
