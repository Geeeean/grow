import { vineyard } from '@/types/vineyard';
import VineyardCard from './vineyard-card';

type Props = { vineyards: vineyard[] };

const VineyardsGrid = ({ vineyards }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full flex-wrap gap-2">
            {vineyards.map((vineyard: vineyard, index: number) => (
                <VineyardCard vineyard={vineyard} key={index} />
            ))}
        </div>
    );
};

export default VineyardsGrid;
