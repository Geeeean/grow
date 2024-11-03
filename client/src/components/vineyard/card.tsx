import { Link } from '@tanstack/react-router';

import VineyardVarietyTooltip from './variety-tooltip';
import VineyardActions from './actions';
import { Badge } from '@/components/ui/badge';
import { Grape, Mountain } from 'lucide-react';

import { Vineyard, VineyardAdd } from '@/types/vineyard';

type Props = {
    vineyard: Vineyard | VineyardAdd;
};

const VineyardCard = ({ vineyard }: Props) => {
    return (
        <div className="relative border flex flex-col gap-2 p-3 rounded-md animate-in fade-in bg-muted/20 hover:border-ring transition-colors z-0">
            {'id' in vineyard && (
                <Link
                    aria-label="Open Vineyard"
                    className="absolute w-full h-full z-10 left-0 top-0"
                    to={`/vineyards/${vineyard.id}`}
                    search={{ bcLast: vineyard.name }}
                />
            )}
            <div className="flex justify-between items-center">
                <Badge variant="outline">{vineyard.soil}</Badge>
                {'id' in vineyard && <VineyardActions vineyardId={vineyard.id} dropdown />}
            </div>

            <div>
                <p className="text-xs text-muted-foreground font-bold">Name</p>
                <p className="font-medium text-lg">{vineyard.name}</p>
            </div>
            <div className="w-full h-20 bg-muted rounded-md" />

            <div className="rounded-md p-3 bg-muted flex flex-col gap-3 items-end">
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
            </div>
            <VineyardVarietyTooltip varieties={vineyard.varieties} full />
        </div>
    );
};

export default VineyardCard;
