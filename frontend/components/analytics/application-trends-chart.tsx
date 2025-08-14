"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface ApplicationTrendsChartProps {
  timeRange: string
}

const data = [
  { month: "Sep", applications: 8, responses: 3, interviews: 1 },
  { month: "Oct", applications: 12, responses: 4, interviews: 2 },
  { month: "Nov", applications: 15, responses: 6, interviews: 3 },
  { month: "Dec", applications: 18, responses: 7, interviews: 4 },
  { month: "Jan", applications: 22, responses: 9, interviews: 5 },
  { month: "Feb", applications: 19, responses: 8, interviews: 3 },
]

const chartConfig = {
  applications: {
    label: "Applications",
    color: "hsl(var(--primary))",
  },
  responses: {
    label: "Responses",
    color: "hsl(var(--chart-3))",
  },
  interviews: {
    label: "Interviews",
    color: "hsl(var(--chart-4))",
  },
}

export function ApplicationTrendsChart({ timeRange }: ApplicationTrendsChartProps) {
  return (
    <Card className="shine-effect">
      <CardHeader>
        <CardTitle className="font-sans">Application Trends</CardTitle>
        <CardDescription className="font-mono">Monthly application activity and outcomes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="applications"
                stackId="1"
                stroke={chartConfig.applications.color}
                fill={chartConfig.applications.color}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="responses"
                stackId="2"
                stroke={chartConfig.responses.color}
                fill={chartConfig.responses.color}
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="interviews"
                stackId="3"
                stroke={chartConfig.interviews.color}
                fill={chartConfig.interviews.color}
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
