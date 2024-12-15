import { Link } from '@tanstack/react-router';

import VineyardVarietiesTooltip from './varieties-tooltip';
import { Badge } from '@/components/ui/badge';
import { Mountain, Sprout } from 'lucide-react';

import { Vineyard, vineyardAction, VineyardId } from '@/types/vineyard';
import { Card, CardContent, CardHeader } from '../ui/card';
import VineyardActionsDropdown from './actions-dropdown';
import { Dispatch, SetStateAction } from 'react';
import { action } from '@/types/shared';
import { getPlantsNumber } from '@/utils/vineyard';

type Props = {
    vineyard: Vineyard;
    setSelectedVineyard: Dispatch<SetStateAction<VineyardId>>;
    getVineyardActionSetter: (action: vineyardAction) => React.Dispatch<React.SetStateAction<boolean>>;
    getActionSetter: (action: action) => Dispatch<SetStateAction<boolean>>;
};

const VineyardCard = ({ vineyard, setSelectedVineyard, getVineyardActionSetter, getActionSetter }: Props) => {
    return (
        <Card className="relative hover:border-ring transition-colors">
            <CardHeader className="flex flex-row justify-between items-center">
                <Badge variant="outline">{vineyard.soil}</Badge>
                <VineyardActionsDropdown
                    vineyardId={vineyard.id}
                    setSelectedVineyard={setSelectedVineyard}
                    getVineyardActionSetter={getVineyardActionSetter}
                    getActionSetter={getActionSetter}
                    className="px-1 py-0.5 h-fit"
                />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Link
                    aria-label="Open Vineyard"
                    className="absolute w-full h-full z-10 left-0 top-0"
                    to={`/vineyards/${vineyard.id}`}
                    search={{ bcLast: vineyard.name }}
                />
                <div className="truncate">
                    <p className="text-xs text-muted-foreground font-bold">Name</p>
                    <p className="font-medium text-lg truncate">{vineyard.name}</p>
                </div>
                <div className="w-full h-20 bg-muted rounded-md" />

                <div className="rounded-md p-3 bg-muted flex flex-col gap-3 items-end">
                    <div className="flex justify-between w-full">
                        <div>
                            <p className="text-xs text-muted-foreground font-bold">Plants</p>
                            <p className="font-medium flex gap-1 items-center">
                                <Sprout />
                                {getPlantsNumber(vineyard.plants, vineyard.plantings)}
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
                <VineyardVarietiesTooltip varieties={vineyard.varieties} full />
            </CardContent>
        </Card>
    );
};

export default VineyardCard;
