"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export const description = "A simple area chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} 

export function ChartAreaDefault({data}) {
  const totalWeekly = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chart Peminjaman</CardTitle>
        <CardDescription>
          Sebuah chart yang menunjukan peminjaman dalam & hari.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[300px]">
  <ChartContainer config={chartConfig} className="w-full h-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ left: 12, right: 12 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="total"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </ChartContainer>
</CardContent>

      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Total peminjaman di minggu ini {totalWeekly} <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Senin Hingga Minggu
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
