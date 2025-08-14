"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface ResponseRateChartProps {
  timeRange: string
}

const data = [
  { company: "TechCorp", applications: 5, responses: 3, rate: 60 },
  { company: "StartupXYZ", applications: 8, responses: 2, rate: 25 },
  { company: "BigTech", applications: 12, responses: 4, rate: 33 },
  { company: "DevCo", applications: 6, responses: 4, rate: 67 },
  { company: "Others", applications: 16, responses: 3, rate: 19 },
]

const chartConfig = {
  rate: {
    label: "Response Rate %",
    color: "hsl(var(--chart-2))",
  },
}

export function ResponseRateChart({ timeRange }: ResponseRateChartProps) {
  return (
    <Card className="shine-effect">
      <CardHeader>
        <CardTitle className="font-sans">Response Rate by Company Type</CardTitle>
        <CardDescription className="font-mono">Success rate across different company categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="company" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="rate" fill={chartConfig.rate.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
