import { Pie, PieChart, Label } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Variety } from '@/types/vineyard';

type Props = {
    varieties: Variety[];
};
const pastelColors = [
    '#3366CC', // Chart 1
    '#33997A', // Chart 2
    '#D98C33', // Chart 3
    '#9A59B5', // Chart 4
    '#D94C85', // Chart 5
];

const sumRows = (varietis: Variety[]): number => {
    return varietis.reduce((accumulator, variety) => accumulator + (variety.rows ?? 0), 0);
};

const VarietiesChart = ({ varieties }: Props) => {
    return (
        <ChartContainer
            config={{}}
            className="min-h-[150px] mx-auto aspect-square md:h-[250px] lg:max-h-none [&_.recharts-text]:fill-background"
        >
            <PieChart>
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            hideLabel
                            className="w-[180px]"
                            formatter={(value, name, item) => {
                                return (
                                    <>
                                        <div
                                            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                            style={{ backgroundColor: item.payload.fill }}
                                        />
                                        {name}
                                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                            {value}
                                            <span className="font-normal text-muted-foreground">rows</span>
                                        </div>
                                    </>
                                );
                            }}
                        />
                    }
                    cursor={false}
                    defaultIndex={1}
                />
                <Pie
                    data={varieties.map((variety: Variety, index: number) => {
                        return {
                            ...variety,
                            fill: pastelColors[index],
                        };
                    })}
                    dataKey="rows"
                    innerRadius={60}
                    strokeWidth={5}
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                return (
                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            {sumRows(varieties)}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            Rows
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />{' '}
                </Pie>
            </PieChart>
        </ChartContainer>
    );
};

export default VarietiesChart;
