import { NewVineyard } from '@/types/vineyard';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Mountain, Sprout } from 'lucide-react';
import VineyardVarietiesTooltip from './varieties-tooltip';

type Props = {
    vineyard: NewVineyard;
};

const VineyardPreview = ({ vineyard }: Props) => {
    return (
        <Card className="relative hover:border-ring transition-colors">
            <CardHeader className="flex flex-row justify-between items-center">
                <Badge variant="outline">{vineyard.soil}</Badge>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
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
                <VineyardVarietiesTooltip varieties={vineyard.varieties} full />
            </CardContent>
        </Card>
    );
};

export default VineyardPreview;
