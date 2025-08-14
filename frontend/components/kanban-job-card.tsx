"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Calendar, ExternalLink, GripVertical } from "lucide-react"

interface KanbanJobCardProps {
  job: any
  onDragStart: (e: React.DragEvent) => void
  onView: () => void
  isDragging: boolean
}

const priorityColors = {
  low: "bg-muted/50 text-muted-foreground",
  medium: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
}

export function KanbanJobCard({ job, onDragStart, onView, isDragging }: KanbanJobCardProps) {
  return (
    <Card
      draggable
      onDragStart={onDragStart}
      className={`cursor-move shine-effect glow-on-hover transition-all duration-200 ${
        isDragging ? "opacity-50 rotate-2 scale-105" : "hover:scale-[1.02]"
      }`}
      onClick={onView}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold font-sans text-sm truncate mb-1">{job.position}</h3>
            <p className="text-xs text-muted-foreground font-mono truncate">{job.company}</p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <GripVertical className="w-3 h-3 text-muted-foreground" />
            <Badge className={priorityColors[job.priority as keyof typeof priorityColors]} variant="outline">
              {job.priority}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          {job.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="font-mono truncate">{job.location}</span>
            </div>
          )}
          {job.salary && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span className="font-mono truncate">{job.salary}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span className="font-mono">{new Date(job.appliedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {job.notes && (
          <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
            <p className="font-mono text-muted-foreground line-clamp-2">{job.notes}</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground font-mono">{job.source || "Unknown source"}</span>
          {job.url && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                window.open(job.url, "_blank")
              }}
              className="h-6 w-6 p-0"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          )}
        </div>

        {job.deadline && new Date(job.deadline) > new Date() && (
          <div className="mt-2 text-xs">
            <Badge variant="outline" className="text-chart-4 border-chart-4/30">
              Due {new Date(job.deadline).toLocaleDateString()}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
