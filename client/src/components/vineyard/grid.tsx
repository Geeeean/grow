import { Vineyard, vineyardAction, VineyardId } from '@/types/vineyard';
import { Dispatch, SetStateAction } from 'react';
import { action } from '@/types/shared';
import { DetailCard, DetailCardContent, DetailCardHeader, DetailCardTitle } from '../ui/detail-card';
import { useNavigate } from '@tanstack/react-router';
import { Grape, Mountain, Sprout } from 'lucide-react';
import { getPlantsNumber } from '@/utils/vineyard';
import { Badge } from '../ui/badge';

type Props = {
    vineyards: Vineyard[];
    setSelectedVineyard: Dispatch<SetStateAction<VineyardId>>;
    getVineyardActionSetter: (action: vineyardAction) => React.Dispatch<React.SetStateAction<boolean>>;
    getActionSetter: (action: action) => Dispatch<SetStateAction<boolean>>;
};

const VineyardsGrid = ({ vineyards }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="h-full overflow-scroll">
            <div className="overflow-scroll grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full flex-wrap gap-3">
                {vineyards.map((vineyard: Vineyard, index: number) => (
                    <DetailCard key={index}>
                        <DetailCardHeader className="h-fit ml-1">
                            <DetailCardTitle>
                                <span
                                    className="truncate font-semibold text-primary hover:underline cursor-pointer"
                                    onClick={() => {
                                        navigate({
                                            to: `/vineyards/${vineyard.id}`,
                                            search: { bcLast: vineyard.name },
                                        });
                                    }}
                                >
                                    {vineyard.name}
                                </span>
                            </DetailCardTitle>
                            <Badge variant="secondary">{vineyard.soil}</Badge>
                        </DetailCardHeader>

                        <div className="flex flex-col gap-1">
                            <DetailCardContent className="grid gap-1 grid-cols-[auto_1fr] items-center">
                                <span className="text-muted-foreground/70 text-sm pr-4 flex items-center">
                                    <Mountain className="mr-1" />
                                    Altitude
                                </span>
                                <span className="font-medium">
                                    {vineyard.altitude} <span className="text-sm">meter</span>
                                </span>
                                <span className="text-muted-foreground/70 text-sm pr-4 flex items-center">
                                    <Sprout className="mr-1" />
                                    Plants
                                </span>
                                <span className="font-medium">
                                    {getPlantsNumber(vineyard.plants, vineyard.plantings)}
                                </span>
                                <span className="text-muted-foreground/70 text-sm pr-4 flex items-center">
                                    <Grape className="mr-1" />
                                    Varieties
                                </span>
                                <div className="flex overflow-x-auto scrollbar-hide gap-1 w-full line-clamp-1">
                                    {vineyard.varieties.map((variety, key) => (
                                        <span
                                            className="whitespace-nowrap px-2 rounded-sm bg-background border text-sm"
                                            key={key}
                                        >
                                            {variety.name}
                                        </span>
                                    ))}
                                </div>
                            </DetailCardContent>
                        </div>
                    </DetailCard>
                ))}
            </div>
        </div>
    );
};

export default VineyardsGrid;
