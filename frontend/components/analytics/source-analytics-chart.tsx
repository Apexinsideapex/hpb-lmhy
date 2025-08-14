"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

interface SourceAnalyticsChartProps {
  timeRange: string
}

const data = [
  { name: "LinkedIn", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Indeed", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Company Sites", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Referrals", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 5, color: "hsl(var(--chart-5))" },
]

const chartConfig = {
  applications: {
    label: "Applications",
  },
}

export function SourceAnalyticsChart({ timeRange }: SourceAnalyticsChartProps) {
  return (
    <Card className="shine-effect">
      <CardHeader>
        <CardTitle className="font-sans">Application Sources</CardTitle>
        <CardDescription className="font-mono">Distribution of application sources</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="font-mono">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
