"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navigation } from "@/components/navigation"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { Briefcase, Plus, Search, Bell, User, X } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status (using localStorage for demo)
    const authToken = localStorage.getItem("auth_token")
    const isLoggedIn = !!authToken

    setIsAuthenticated(isLoggedIn)

    if (!isLoggedIn) {
      router.push("/landing")
    }
  }, [router])

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If not authenticated, redirect will happen in useEffect
  if (!isAuthenticated) {
    return null
  }

  // Return the existing dashboard for authenticated users
  return <DashboardContent />
}

function DashboardContent() {
  const [showOnboardingReminder, setShowOnboardingReminder] = useState(false)

  useEffect(() => {
    const onboardingSkipped = localStorage.getItem("onboarding_skipped")
    const skipDate = localStorage.getItem("onboarding_skip_date")
    const reminderDismissed = localStorage.getItem("onboarding_reminder_dismissed")

    if (onboardingSkipped && !reminderDismissed) {
      const daysSinceSkip = skipDate
        ? Math.floor((Date.now() - new Date(skipDate).getTime()) / (1000 * 60 * 60 * 24))
        : 0

      if (daysSinceSkip >= 0) {
        setShowOnboardingReminder(true)
      }
    }
  }, [])

  const dismissReminder = () => {
    localStorage.setItem("onboarding_reminder_dismissed", "true")
    setShowOnboardingReminder(false)
  }

  const completeOnboarding = () => {
    localStorage.removeItem("onboarding_skipped")
    localStorage.removeItem("onboarding_skip_date")
    localStorage.removeItem("onboarding_reminder_dismissed")
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
              <Navigation />
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search applications..." className="pl-10 w-64 shine-effect" />
                </div>
              </div>
              <Button variant="ghost" size="icon" className="glow-on-hover touch-target mobile-icon-button">
                <Bell className="w-4 h-4" />
              </Button>
              <Link href="/auth/signin" className="hidden sm:block">
                <Button variant="outline" className="glow-on-hover bg-transparent touch-target">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Button className="shine-effect glow-on-hover touch-target mobile-button">
                <Plus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Add Job</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 mobile-padding">
        {showOnboardingReminder && (
          <Alert className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/50">
            <User className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="flex items-center justify-between">
              <div>
                <strong>Complete your profile setup</strong> to get personalized job recommendations and better tracking
                insights.
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link href="/onboarding" onClick={completeOnboarding}>
                  <Button size="sm" className="h-8">
                    Complete Setup
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={dismissReminder} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-sans">Dashboard</h2>
          <p className="text-muted-foreground font-mono text-sm sm:text-base">
            Track your job search progress and stay organized
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 sm:mb-8">
          <DashboardStats />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Recent Activity - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>

          {/* Application Status Overview */}
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="font-sans text-lg sm:text-xl">Application Status</CardTitle>
              <CardDescription className="font-mono text-sm">Current pipeline overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { status: "Applied", count: 8, color: "bg-primary" },
                  { status: "Interview", count: 3, color: "bg-chart-4" },
                  { status: "Offer", count: 2, color: "bg-chart-3" },
                  { status: "Rejected", count: 11, color: "bg-destructive" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between touch-target">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-mono">{item.status}</span>
                    </div>
                    <span className="font-bold font-sans text-lg">{item.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 font-sans">Quick Actions</h3>
          <QuickActions />
        </div>

        {/* Goals Section */}
        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="font-sans text-lg sm:text-xl">Weekly Goals</CardTitle>
            <CardDescription className="font-mono text-sm">Stay on track with your job search</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between touch-target">
                <span className="text-sm font-mono">Applications this week</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 sm:w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-3/5 h-full bg-primary rounded-full" />
                  </div>
                  <span className="text-sm font-bold font-sans">3/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between touch-target">
                <span className="text-sm font-mono">Follow-ups sent</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 sm:w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-chart-3 rounded-full" />
                  </div>
                  <span className="text-sm font-bold font-sans">4/5</span>
                </div>
              </div>
              <div className="flex items-center justify-between touch-target">
                <span className="text-sm font-mono">Network connections</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 sm:w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-chart-4 rounded-full" />
                  </div>
                  <span className="text-sm font-bold font-sans">1/3</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
