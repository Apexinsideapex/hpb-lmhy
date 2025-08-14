import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, MessageSquare, Calendar, CheckCircle, XCircle } from "lucide-react"

const activities = [
  {
    type: "application",
    icon: Plus,
    title: "Applied to Senior Developer at TechCorp",
    description: "Submitted application via LinkedIn",
    time: "2 hours ago",
    status: "applied",
  },
  {
    type: "interview",
    icon: Calendar,
    title: "Interview scheduled with StartupXYZ",
    description: "Technical interview on Friday 2PM",
    time: "1 day ago",
    status: "interview",
  },
  {
    type: "message",
    icon: MessageSquare,
    title: "Message from recruiter at BigTech",
    description: "Follow-up on application status",
    time: "2 days ago",
    status: "contact",
  },
  {
    type: "offer",
    icon: CheckCircle,
    title: "Offer received from DevCompany",
    description: "$120k base salary, remote work",
    time: "3 days ago",
    status: "offer",
  },
  {
    type: "rejection",
    icon: XCircle,
    title: "Application rejected by MegaCorp",
    description: "Position filled internally",
    time: "1 week ago",
    status: "rejected",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "applied":
      return "bg-primary/10 text-primary"
    case "interview":
      return "bg-chart-4/10 text-chart-4"
    case "contact":
      return "bg-chart-2/10 text-chart-2"
    case "offer":
      return "bg-chart-3/10 text-chart-3"
    case "rejected":
      return "bg-destructive/10 text-destructive"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 shine-effect">
              <Avatar className={`w-8 h-8 ${getStatusColor(activity.status)}`}>
                <AvatarFallback className="bg-transparent">
                  <activity.icon className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm font-sans">{activity.title}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
