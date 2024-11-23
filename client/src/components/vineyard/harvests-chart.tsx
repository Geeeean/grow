'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
    { month: 'August', desktop: 100 },
    { month: 'September', desktop: 70 },
    { month: 'October', desktop: 56 },
    { month: 'November', desktop: 120 },
    { month: 'December', desktop: 250 },
];

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#3366CC',
    },
} satisfies ChartConfig;

const HarvestsChart = () => {
    return (
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            hideLabel
                            className="w-[180px]"
                            formatter={(value, name) => (
                                <div className="w-full">
                                    <div className="w-full flex gap-4 justify-between items-center">
                                        {chartConfig[name as keyof typeof chartConfig]?.label || name}
                                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                            {value}
                                            <span className="font-normal text-muted-foreground">kg</span>
                                        </div>
                                    </div>
                                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                        {value}
                                        <span className="font-normal text-muted-foreground">kg</span>
                                    </div>
                                </div>
                            )}
                        />
                    }
                    cursor={false}
                    defaultIndex={1}
                />
                <Area
                    dataKey="desktop"
                    type="linear"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                />
            </AreaChart>
        </ChartContainer>
    );
};

export default HarvestsChart;
