import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, Clock, CheckCircle, Users, Calendar, DollarSign } from "lucide-react"

interface AnalyticsMetricsProps {
  timeRange: string
}

const metrics = [
  {
    icon: Target,
    label: "Total Applications",
    value: "47",
    change: "+12",
    changeType: "increase",
    period: "vs last period",
    color: "text-primary",
  },
  {
    icon: CheckCircle,
    label: "Response Rate",
    value: "34%",
    change: "+8%",
    changeType: "increase",
    period: "vs last period",
    color: "text-chart-3",
  },
  {
    icon: Clock,
    label: "Avg Response Time",
    value: "5.2 days",
    change: "-1.3 days",
    changeType: "decrease",
    period: "vs last period",
    color: "text-chart-4",
  },
  {
    icon: Users,
    label: "Interview Rate",
    value: "18%",
    change: "+3%",
    changeType: "increase",
    period: "vs last period",
    color: "text-chart-2",
  },
  {
    icon: DollarSign,
    label: "Avg Salary Target",
    value: "$118k",
    change: "+$8k",
    changeType: "increase",
    period: "vs last period",
    color: "text-chart-5",
  },
  {
    icon: Calendar,
    label: "Applications/Week",
    value: "3.2",
    change: "+0.8",
    changeType: "increase",
    period: "vs last period",
    color: "text-primary",
  },
]

export function AnalyticsMetrics({ timeRange }: AnalyticsMetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <Card key={index} className="shine-effect glow-on-hover">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <metric.icon className={`w-4 h-4 ${metric.color}`} />
              {metric.changeType === "increase" ? (
                <TrendingUp className="w-3 h-3 text-chart-3" />
              ) : (
                <TrendingDown className="w-3 h-3 text-chart-3" />
              )}
            </div>
            <div>
              <p className="text-2xl font-bold font-sans">{metric.value}</p>
              <p className="text-xs text-muted-foreground font-mono mb-1">{metric.label}</p>
              <div className="flex items-center gap-1">
                <span
                  className={`text-xs font-mono ${metric.changeType === "increase" ? "text-chart-3" : "text-chart-3"}`}
                >
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{metric.period}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
