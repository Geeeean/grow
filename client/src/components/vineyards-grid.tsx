import { Vineyard } from '@/types/vineyard';
import VineyardCard from './vineyard-card';

type Props = { vineyards: Vineyard[] };

const VineyardsGrid = ({ vineyards }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full flex-wrap gap-2">
            {vineyards.map((vineyard: Vineyard, index: number) => (
                <VineyardCard vineyard={vineyard} key={index} />
            ))}
        </div>
    );
};

export default VineyardsGrid;
