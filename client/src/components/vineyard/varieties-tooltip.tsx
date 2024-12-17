import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils/shared';
import { NewVariety, Variety } from '@/types/vineyard';

import { Info } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

type Props = {
    varieties: Variety[] | NewVariety[];
    full: boolean;
};

const VineyardVarietiesTooltip = ({ varieties, full = false }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger
                    className={cn(
                        'z-20 flex items-center gap-2 bg-secondary text-secondary-foreground px-2 py-1 rounded-sm',
                        full && 'justify-center w-full',
                    )}
                >
                    {varieties.length} variet{varieties.length > 1 ? 'ies' : 'y'}
                    <Info />
                </TooltipTrigger>
                <TooltipContent className="z-20 grid grid-cols-[repeat(3,auto)] bg-background-dark border items-start">
                    <p className="font-medium text-primary/70">Variety</p>
                    <p className="font-medium text-primary/70">Age</p>
                    <p className="font-medium text-primary/70">Rows</p>
                    {varieties.map((variety, index: number) => (
                        <Fragment key={index}>
                            <p className="text-primary text-sm mr-6 font-medium">{variety.name}</p>
                            <p className="text-primary text-sm w-10 truncate">{variety.age}</p>
                            <p className="text-primary text-sm w-10 truncate">{variety.rows}</p>
                        </Fragment>
                    ))}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default VineyardVarietiesTooltip;
