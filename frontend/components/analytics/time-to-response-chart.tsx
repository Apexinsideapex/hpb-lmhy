"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface TimeToResponseChartProps {
  timeRange: string
}

const data = [
  { week: "Week 1", avgDays: 7.2, applications: 8 },
  { week: "Week 2", avgDays: 5.8, applications: 12 },
  { week: "Week 3", avgDays: 4.5, applications: 15 },
  { week: "Week 4", avgDays: 6.1, applications: 10 },
  { week: "Week 5", avgDays: 3.9, applications: 18 },
  { week: "Week 6", avgDays: 5.2, applications: 14 },
]

const chartConfig = {
  avgDays: {
    label: "Avg Response Time (Days)",
    color: "hsl(var(--chart-5))",
  },
}

export function TimeToResponseChart({ timeRange }: TimeToResponseChartProps) {
  return (
    <Card className="shine-effect">
      <CardHeader>
        <CardTitle className="font-sans">Response Time Trends</CardTitle>
        <CardDescription className="font-mono">Average time to receive responses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="avgDays"
                stroke={chartConfig.avgDays.color}
                strokeWidth={3}
                dot={{ fill: chartConfig.avgDays.color, strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
