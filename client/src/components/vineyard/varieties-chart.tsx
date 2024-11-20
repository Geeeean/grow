import { LabelList, Pie, PieChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Variety } from '@/types/vineyard';
import { useMemo } from 'react';
type Props = {
    varieties: Variety[];
};

const getConfig = (): ChartConfig => {
    const chartConfig: ChartConfig = {
        desktop: {
            label: 'Desktop',
            color: '#2563eb',
        },
        mobile: {
            label: 'Mobile',
            color: '#60a5fa',
        },
    };

    return chartConfig;
};

const VarietiesChart = ({ varieties }: Props) => {
    const config = getConfig();

    return (
        <ChartContainer
            config={config}
            className="min-h-[150px] mx-auto aspect-square md:h-[250px] lg:max-h-none [&_.recharts-text]:fill-background"
        >
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="rows" />} />
                <Pie data={varieties} dataKey="rows">
                    <LabelList dataKey="name" className="fill-background" stroke="none" fontSize={12} />
                </Pie>
            </PieChart>
        </ChartContainer>
    );
};

export default VarietiesChart;
