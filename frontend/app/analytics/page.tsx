"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import { ApplicationTrendsChart } from "@/components/analytics/application-trends-chart"
import { ResponseRateChart } from "@/components/analytics/response-rate-chart"
import { SourceAnalyticsChart } from "@/components/analytics/source-analytics-chart"
import { TimeToResponseChart } from "@/components/analytics/time-to-response-chart"
import { AnalyticsMetrics } from "@/components/analytics/analytics-metrics"
import { GoalsProgress } from "@/components/analytics/goals-progress"
import { Briefcase, TrendingUp, Calendar, Download } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("3months")

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

            <Button variant="outline" className="glow-on-hover bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold font-sans">Analytics Dashboard</h2>
            <p className="text-muted-foreground font-mono">Track your job search progress and optimize your strategy</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 shine-effect">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <AnalyticsMetrics timeRange={timeRange} />

        {/* Goals Progress */}
        <div className="mb-8">
          <GoalsProgress />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Application Trends */}
          <ApplicationTrendsChart timeRange={timeRange} />

          {/* Response Rate */}
          <ResponseRateChart timeRange={timeRange} />

          {/* Source Analytics */}
          <SourceAnalyticsChart timeRange={timeRange} />

          {/* Time to Response */}
          <TimeToResponseChart timeRange={timeRange} />
        </div>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shine-effect">
            <CardHeader>
              <CardTitle className="font-sans flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-chart-3" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-chart-3/10 rounded-lg border border-chart-3/20">
                <p className="text-sm font-mono text-chart-3 mb-1">Strong Performance</p>
                <p className="text-sm">Your response rate increased by 15% this month compared to last month.</p>
              </div>
              <div className="p-3 bg-chart-4/10 rounded-lg border border-chart-4/20">
                <p className="text-sm font-mono text-chart-4 mb-1">Opportunity</p>
                <p className="text-sm">LinkedIn applications have a 40% higher response rate than other sources.</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-mono text-primary mb-1">Trend</p>
                <p className="text-sm">Tuesday applications get responses 2x faster than Friday applications.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shine-effect">
            <CardHeader>
              <CardTitle className="font-sans flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-semibold mb-1 font-sans">Focus on LinkedIn</p>
                <p className="text-sm text-muted-foreground font-mono">
                  Increase LinkedIn applications by 20% to improve overall response rate.
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-semibold mb-1 font-sans">Optimize Timing</p>
                <p className="text-sm text-muted-foreground font-mono">
                  Apply on Tuesdays and Wednesdays for faster responses.
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-semibold mb-1 font-sans">Follow Up Strategy</p>
                <p className="text-sm text-muted-foreground font-mono">
                  Send follow-ups after 1 week to increase response rate by 25%.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
