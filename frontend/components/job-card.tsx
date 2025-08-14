"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MapPin, DollarSign, Calendar, ExternalLink, MoreVertical, Eye } from "lucide-react"

interface JobCardProps {
  job: any
  viewMode: "grid" | "list"
  onView: () => void
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

export function JobCard({ job, viewMode, onView, onUpdate }: JobCardProps) {
  const handleStatusChange = (newStatus: string) => {
    onUpdate({ status: newStatus })
  }

  if (viewMode === "list") {
    return (
      <Card className="shine-effect glow-on-hover">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold font-sans truncate">{job.position}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{job.company}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge className={statusColors[job.status as keyof typeof statusColors]}>{job.status}</Badge>
                  <Badge variant="outline" className={priorityColors[job.priority as keyof typeof priorityColors]}>
                    {job.priority}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(job.appliedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
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
                  <DropdownMenuItem onClick={() => handleStatusChange("applied")}>Mark as Applied</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("interview")}>Mark as Interview</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("offer")}>Mark as Offer</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("rejected")}>Mark as Rejected</DropdownMenuItem>
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
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold font-sans truncate">{job.position}</h3>
            <p className="text-sm text-muted-foreground font-mono">{job.company}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStatusChange("applied")}>Mark as Applied</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("interview")}>Mark as Interview</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("offer")}>Mark as Offer</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("rejected")}>Mark as Rejected</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="font-mono">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span className="font-mono">{job.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="font-mono">Applied {new Date(job.appliedDate).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Badge className={statusColors[job.status as keyof typeof statusColors]}>{job.status}</Badge>
              <Badge variant="outline" className={priorityColors[job.priority as keyof typeof priorityColors]}>
                {job.priority}
              </Badge>
            </div>
            {job.url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(job.url, "_blank")
                }}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
