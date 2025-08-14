import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Calendar, Users, TrendingUp } from "lucide-react"

const goals = [
  {
    icon: Target,
    title: "Weekly Applications",
    current: 4,
    target: 5,
    unit: "applications",
    color: "text-primary",
    progressColor: "bg-primary",
  },
  {
    icon: Calendar,
    title: "Monthly Interviews",
    current: 3,
    target: 4,
    unit: "interviews",
    color: "text-chart-4",
    progressColor: "bg-chart-4",
  },
  {
    icon: Users,
    title: "Network Connections",
    current: 8,
    target: 10,
    unit: "connections",
    color: "text-chart-2",
    progressColor: "bg-chart-2",
  },
  {
    icon: TrendingUp,
    title: "Response Rate Goal",
    current: 34,
    target: 40,
    unit: "%",
    color: "text-chart-3",
    progressColor: "bg-chart-3",
  },
]

export function GoalsProgress() {
  return (
    <Card className="shine-effect">
      <CardHeader>
        <CardTitle className="font-sans">Goals Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100
            const isCompleted = progress >= 100

            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center gap-2">
                  <goal.icon className={`w-4 h-4 ${goal.color}`} />
                  <span className="text-sm font-semibold font-sans">{goal.title}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                    <span className={`font-mono ${isCompleted ? "text-chart-3" : "text-muted-foreground"}`}>
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
