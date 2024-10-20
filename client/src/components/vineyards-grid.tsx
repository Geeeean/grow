import { Badge } from '@/components/ui/badge';

import { vineyard } from '@/types/vineyard';
import VineyardActions from './vineyard-actions';
import { Grape, Mountain } from 'lucide-react';
import VineyardVarietyTooltip from './vineyard-variety-tooltip';

type Props = { vineyards: vineyard[] };

const VineyardsGrid = ({ vineyards }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full flex-wrap gap-2">
            {vineyards.map((vineyard: vineyard, index: number) => (
                <div className="border flex flex-col gap-2 p-3 rounded-md" key={index}>
                    <div className="flex justify-between items-center">
                        <Badge variant="outline">{vineyard.soil}</Badge>
                        <VineyardActions />
                    </div>

                    <div>
                        <p className="text-xs text-muted-foreground font-bold">Name</p>
                        <p className="font-medium text-lg">{vineyard.name}</p>
                    </div>
                    <div className="w-full h-20 bg-muted rounded-md" />

                    <div className="border rounded-md p-3 bg-background-dark flex flex-col gap-3 items-end">
                        <div className="flex justify-between w-full">
                            <div>
                                <p className="text-xs text-muted-foreground font-bold">Total Plants</p>
                                <p className="font-medium flex gap-1 items-center">
                                    <Grape />
                                    {vineyard.plants}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-bold">Altitude</p>
                                <p className="font-medium flex items-center gap-1">
                                    <Mountain />
                                    {vineyard.altitude}m
                                </p>
                            </div>
                        </div>
                        <VineyardVarietyTooltip varieties={vineyard.varieties} full />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VineyardsGrid;
