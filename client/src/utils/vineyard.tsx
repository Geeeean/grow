import { vineyardAction } from '@/types/vineyard';
import { Grape, Scissors, TreeDeciduous, FlaskRound, Shovel } from 'lucide-react';

export const vineyardActionCopy: Record<vineyardAction, string> = {
    harvest: 'Harvest',
    cut: 'Grass cutting',
    trim: 'Trimming',
    treatment: 'Treatment',
    planting: 'Explantation',
};

const vineyardActionIcon: Record<vineyardAction, (className?: string) => JSX.Element> = {
    harvest: (classname) => <Grape className={classname} />,
    cut: (classname) => <Scissors className={classname} />,
    trim: (classname) => <TreeDeciduous className={classname} />,
    treatment: (classname) => <FlaskRound className={classname} />,
    planting: (classname) => <Shovel className={classname} />,
};

export const getVineyardActionIcon = (action: vineyardAction, className?: string) => {
    return vineyardActionIcon[action](className);
};
