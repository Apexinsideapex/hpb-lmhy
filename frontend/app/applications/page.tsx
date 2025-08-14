"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { JobApplicationForm } from "@/components/job-application-form"
import { MobileOptimizedForm } from "@/components/mobile-optimized-forms"
import { JobCard } from "@/components/job-card"
import { JobDetailsModal } from "@/components/job-details-modal"
import { KanbanBoard } from "@/components/kanban-board"
import { MobileKanbanBoard } from "@/components/mobile-kanban-board"
import { Briefcase, Plus, Search, Grid, List, Columns } from "lucide-react"

// Mock data - in real app this would come from API/database
const mockJobs = [
  {
    id: "1",
    company: "TechCorp",
    position: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    status: "interview",
    appliedDate: "2024-01-15",
    source: "LinkedIn",
    priority: "high",
    notes: "Great company culture, remote-friendly",
    url: "https://techcorp.com/careers",
    deadline: "2024-02-01",
  },
  {
    id: "2",
    company: "StartupXYZ",
    position: "Frontend Engineer",
    location: "Remote",
    salary: "$90,000 - $110,000",
    status: "applied",
    appliedDate: "2024-01-20",
    source: "Company Website",
    priority: "medium",
    notes: "Early stage startup, equity opportunity",
    url: "https://startupxyz.com/jobs",
    deadline: "2024-01-30",
  },
  {
    id: "3",
    company: "BigTech Inc",
    position: "Software Engineer",
    location: "Seattle, WA",
    salary: "$140,000 - $180,000",
    status: "rejected",
    appliedDate: "2024-01-10",
    source: "Referral",
    priority: "high",
    notes: "Position filled internally",
    url: "https://bigtech.com/careers",
    deadline: "2024-01-25",
  },
  {
    id: "4",
    company: "DevCompany",
    position: "Backend Developer",
    location: "Austin, TX",
    salary: "$100,000 - $130,000",
    status: "offer",
    appliedDate: "2024-01-05",
    source: "Indeed",
    priority: "high",
    notes: "Great benefits package, 4-day work week",
    url: "https://devcompany.com/jobs",
    deadline: "2024-01-20",
  },
]

export default function ApplicationsPage() {
  const [jobs, setJobs] = useState(mockJobs)
  const [showForm, setShowForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "kanban">("kanban")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddJob = (jobData: any) => {
    const newJob = {
      ...jobData,
      id: Date.now().toString(),
      appliedDate: new Date().toISOString().split("T")[0],
    }
    setJobs([newJob, ...jobs])
    setShowForm(false)
  }

  const handleUpdateJob = (jobId: string, updates: any) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, ...updates } : job)))
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
              <div className="hidden md:block">
                <Navigation />
              </div>
              <MobileNavigation />
            </div>

            <Button onClick={() => setShowForm(true)} className="shine-effect glow-on-hover">
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add Job</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-sans">Job Applications</h2>
            <p className="text-muted-foreground font-mono text-sm md:text-base">
              Manage and track your job applications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "kanban" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("kanban")}
              className="glow-on-hover"
            >
              <Columns className="w-4 h-4" />
            </Button>
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

        {/* Filters and Search - Only show for grid/list views */}
        {viewMode !== "kanban" && (
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by company or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 shine-effect h-12 text-base" // Larger for mobile
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {["all", "applied", "interview", "offer", "rejected"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize glow-on-hover whitespace-nowrap"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Kanban Board View */}
        {viewMode === "kanban" && (
          <>
            {/* Desktop Kanban */}
            <div className="hidden md:block">
              <KanbanBoard
                jobs={filteredJobs}
                onUpdateJob={handleUpdateJob}
                onViewJob={setSelectedJob}
                onAddJob={() => setShowForm(true)}
              />
            </div>
            {/* Mobile Kanban */}
            <MobileKanbanBoard
              jobs={filteredJobs}
              onUpdateJob={handleUpdateJob}
              onViewJob={setSelectedJob}
              onAddJob={() => setShowForm(true)}
            />
          </>
        )}

        {/* Grid/List View */}
        {viewMode !== "kanban" && (
          <>
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  viewMode={viewMode}
                  onView={() => setSelectedJob(job)}
                  onUpdate={(updates) => handleUpdateJob(job.id, updates)}
                />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 font-sans">No applications found</h3>
                <p className="text-muted-foreground font-mono mb-4 text-sm md:text-base">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Start by adding your first job application"}
                </p>
                <Button onClick={() => setShowForm(true)} className="shine-effect glow-on-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Job
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Job Application Form Modal */}
      {showForm && (
        <>
          {/* Desktop Form */}
          <div className="hidden md:block">
            <JobApplicationForm onSubmit={handleAddJob} onCancel={() => setShowForm(false)} />
          </div>
          {/* Mobile Form */}
          <div className="md:hidden">
            <MobileOptimizedForm type="job" onSubmit={handleAddJob} onCancel={() => setShowForm(false)} />
          </div>
        </>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onUpdate={(updates) => {
            handleUpdateJob(selectedJob.id, updates)
            setSelectedJob({ ...selectedJob, ...updates })
          }}
        />
      )}
    </div>
  )
}
