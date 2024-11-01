import { Vineyard } from '@/types/vineyard';
import { Badge } from '@/components/ui/badge';

import VineyardActions from './vineyard-actions';
import { Grape, Mountain } from 'lucide-react';
import VineyardVarietyTooltip from './vineyard-variety-tooltip';
import { Link } from '@tanstack/react-router';

type Props = {
    vineyard: Vineyard;
    preview?: boolean;
};

const VineyardCard = ({ vineyard, preview = false }: Props) => {
    console.log(vineyard);

    return (
        <Link to={`/vineyards/${vineyard.id}`} className="border flex flex-col gap-2 p-3 rounded-md animate-in fade-in">
            <div className="flex justify-between items-center">
                <Badge variant="outline">{vineyard.soil}</Badge>
                {!preview && <VineyardActions />}
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
        </Link>
    );
};

export default VineyardCard;
