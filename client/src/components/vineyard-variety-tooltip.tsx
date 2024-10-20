import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { variety } from '@/types/vineyard';

import { Info } from 'lucide-react';

type Props = {
    varieties: variety[];
    full: boolean;
};

const VineyardVarietyTooltip = ({ varieties, full = false }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger
                    className={cn(
                        'flex items-center gap-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-sm',
                        full && 'justify-center w-full',
                    )}
                >
                    {varieties.length} variet{varieties.length > 1 ? "ies" : "y"}
                    <Info />
                </TooltipTrigger>
                <TooltipContent className="grid grid-cols-[repeat(3,auto)] bg-background-dark border">
                    <p className="font-medium text-primary/70">Variety</p>
                    <p className="font-medium text-primary/70">Age</p>
                    <p className="font-medium text-primary/70">Rows</p>
                    {varieties.map((variety: variety, index: number) => (
                        <>
                            <p key={'v-' + index} className="text-primary text-sm mr-6 font-medium">
                                {variety.variety}
                            </p>
                            <p key={'r-' + index} className="text-primary text-sm w-10 truncate">
                                {variety.rows}
                            </p>
                            <p key={'a-' + index} className="text-primary text-sm w-10 truncate">
                                {variety.rows}
                            </p>
                        </>
                    ))}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default VineyardVarietyTooltip;
