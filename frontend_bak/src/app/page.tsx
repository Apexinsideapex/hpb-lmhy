"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Briefcase, Calendar, Target } from "lucide-react"

export default function DashboardPage() {
  // Mock data - replace with API calls later
  const stats = {
    totalJobs: 24,
    activeApplications: 12,
    interviews: 5,
    thisWeekApplications: 3
  }

  const recentJobs = [
    {
      id: "1",
      company: "Google",
      position: "Software Engineer", 
      status: "interview",
      appliedDate: "2024-01-15"
    },
    {
      id: "2",
      company: "Meta", 
      position: "Frontend Developer",
      status: "applied",
      appliedDate: "2024-01-10"
    }
  ]

  const statusColors = {
    saved: "bg-gray-100 text-gray-800",
    applied: "bg-blue-100 text-blue-800",
    interview: "bg-yellow-100 text-yellow-800", 
    offer: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800"
  }

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold">{stats.totalJobs}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{stats.activeApplications}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Interviews</p>
                <p className="text-2xl font-bold">{stats.interviews}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">{stats.thisWeekApplications}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button className="h-12">Add Job</Button>
            <Button variant="outline" className="h-12">View Analytics</Button>
            <Button variant="outline" className="h-12">Add Contact</Button>
            <Button variant="outline" className="h-12">Export Data</Button>
          </div>
        </Card>

        {/* Recent Applications */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Recent Applications</h3>
            <Button variant="link" size="sm">View All</Button>
          </div>
          
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{job.position}</p>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
                <div className="text-right">
                  <Badge className={statusColors[job.status as keyof typeof statusColors]}>
                    {job.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">{job.appliedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Progress Motivation */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="font-semibold mb-2">Keep Going! 🚀</h3>
          <p className="text-gray-600 mb-4">
            You're making great progress on your job search. 
            You've applied to {stats.totalJobs} jobs this month!
          </p>
          <Button>Add Another Application</Button>
        </Card>
      </div>
    </MainLayout>
  )
}
