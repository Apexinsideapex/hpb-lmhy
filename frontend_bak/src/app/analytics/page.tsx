"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card } from "@/components/ui/card"
import { TrendingUp, Target, Users, Calendar } from "lucide-react"

// Mock analytics data
const analytics = {
  totalApplications: 24,
  responseRate: 33.3,
  interviewsScheduled: 5,
  offersReceived: 2,
  applicationsThisWeek: 3,
  applicationsThisMonth: 12
}

export default function AnalyticsPage() {
  return (
    <MainLayout title="Analytics">
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold">{analytics.totalApplications}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold">{analytics.responseRate}%</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Interviews</p>
                <p className="text-2xl font-bold">{analytics.interviewsScheduled}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Offers</p>
                <p className="text-2xl font-bold">{analytics.offersReceived}</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>Applications this week</span>
              <span className="font-medium">{analytics.applicationsThisWeek}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Applications this month</span>
              <span className="font-medium">{analytics.applicationsThisMonth}</span>
            </div>
          </div>
        </Card>
        
        {/* Progress Chart Placeholder */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Application Progress</h3>
          <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart will be implemented here</p>
          </div>
        </Card>
      </div>
    </MainLayout>
  )
}