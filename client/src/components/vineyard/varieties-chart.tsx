import { LabelList, Pie, PieChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Variety } from '@/types/vineyard';
type Props = {
    varieties: Variety[];
};

const VarietiesChart = ({ varieties }: Props) => {
    console.log(varieties);

    return (
        <ChartContainer
            config={{}}
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
