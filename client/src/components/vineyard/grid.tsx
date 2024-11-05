import { Vineyard, vineyardAction, VineyardId } from '@/types/vineyard';
import VineyardCard from './card';
import { Dispatch, SetStateAction } from 'react';
import { action } from '@/types/shared';

type Props = {
    vineyards: Vineyard[];
    setSelectedVineyard: Dispatch<SetStateAction<VineyardId>>;
    getVineyardActionSetter: (action: vineyardAction) => React.Dispatch<React.SetStateAction<boolean>>;
    getActionSetter: (action: action) => Dispatch<SetStateAction<boolean>>;
};

const VineyardsGrid = ({ vineyards, setSelectedVineyard, getVineyardActionSetter, getActionSetter }: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full flex-wrap gap-2">
            {vineyards.map((vineyard: Vineyard, index: number) => (
                <VineyardCard
                    vineyard={vineyard}
                    key={index}
                    setSelectedVineyard={setSelectedVineyard}
                    getVineyardActionSetter={getVineyardActionSetter}
                    getActionSetter={getActionSetter}
                />
            ))}
        </div>
    );
};

export default VineyardsGrid;
