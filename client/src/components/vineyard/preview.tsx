import { NewVineyard } from '@/types/vineyard';
import { Badge } from '../ui/badge';
import { Grape, Mountain, Sprout } from 'lucide-react';
import { DetailCard, DetailCardContent, DetailCardHeader, DetailCardTitle } from '../ui/detail-card';
import { getPlantsNumber } from '@/utils/vineyard';

type Props = {
    vineyard: NewVineyard;
};

const VineyardPreview = ({ vineyard }: Props) => {
    return (
        <DetailCard>
            <DetailCardHeader className="h-fit ml-1">
                <DetailCardTitle>
                    <span className="truncate font-semibold py-2">{vineyard.name}</span>
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
                    <span className="font-medium">{getPlantsNumber(vineyard.plants ?? 0, [])}</span>
                    <span className="text-muted-foreground/70 text-sm pr-4 flex items-center">
                        <Grape className="mr-1" />
                        Varieties
                    </span>
                    <div className="flex overflow-x-auto scrollbar-hide gap-1 w-full line-clamp-1">
                        {vineyard.varieties.map((variety, key) => (
                            <span className="whitespace-nowrap px-2 rounded-sm bg-background border text-sm" key={key}>
                                {variety.name}
                            </span>
                        ))}
                    </div>
                </DetailCardContent>
            </div>
        </DetailCard>
    );
};

export default VineyardPreview;
