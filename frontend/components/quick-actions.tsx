import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, BarChart3, Users, Calendar, FileText } from "lucide-react"

const actions = [
  {
    icon: Plus,
    title: "Add Application",
    description: "Track a new job opportunity",
    color: "text-primary",
  },
  {
    icon: Search,
    title: "Find Jobs",
    description: "Search for new positions",
    color: "text-chart-2",
  },
  {
    icon: Calendar,
    title: "Schedule Interview",
    description: "Add upcoming interviews",
    color: "text-chart-4",
  },
  {
    icon: Users,
    title: "Add Contact",
    description: "Save recruiter information",
    color: "text-chart-3",
  },
  {
    icon: BarChart3,
    title: "View Analytics",
    description: "Track your progress",
    color: "text-primary",
  },
  {
    icon: FileText,
    title: "Update Resume",
    description: "Manage your documents",
    color: "text-chart-2",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <Card key={index} className="shine-effect glow-on-hover cursor-pointer group">
          <CardContent className="p-4">
            <div className="text-center">
              <action.icon
                className={`w-6 h-6 ${action.color} mx-auto mb-2 group-hover:scale-110 transition-transform`}
              />
              <h3 className="font-semibold text-sm mb-1 font-sans">{action.title}</h3>
              <p className="text-xs text-muted-foreground font-mono">{action.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
