import { Card, CardContent } from "@/components/ui/card"
import { Target, TrendingUp, Users, Clock, CheckCircle, XCircle, Calendar, DollarSign } from "lucide-react"

const stats = [
  {
    icon: Target,
    label: "Total Applied",
    value: "24",
    change: "+3 this week",
    color: "text-primary",
  },
  {
    icon: Clock,
    label: "In Progress",
    value: "8",
    change: "2 interviews scheduled",
    color: "text-chart-4",
  },
  {
    icon: CheckCircle,
    label: "Offers",
    value: "2",
    change: "+1 this month",
    color: "text-chart-3",
  },
  {
    icon: XCircle,
    label: "Rejected",
    value: "14",
    change: "58% response rate",
    color: "text-destructive",
  },
  {
    icon: Users,
    label: "Contacts",
    value: "15",
    change: "8 recruiters",
    color: "text-chart-2",
  },
  {
    icon: Calendar,
    label: "This Week",
    value: "5",
    change: "applications sent",
    color: "text-primary",
  },
  {
    icon: DollarSign,
    label: "Avg Salary",
    value: "$95k",
    change: "target range",
    color: "text-chart-4",
  },
  {
    icon: TrendingUp,
    label: "Response Rate",
    value: "42%",
    change: "+5% vs last month",
    color: "text-chart-3",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shine-effect glow-on-hover">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-muted-foreground font-mono">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold font-sans">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
