import { vineyardAction } from '@/types/vineyard';
import { Grape, Scissors, TreeDeciduous, FlaskRound, Shovel } from 'lucide-react';

export const vineyardActionCopy: Record<vineyardAction, string> = {
    harvest: 'Harvest',
    cutting: 'Cutting grass',
    trimming: 'Trimming',
    treatment: 'Treatment',
    explantation: 'Explantation',
};

const vineyardActionIcon: Record<vineyardAction, (className?: string) => JSX.Element> = {
    harvest: (classname) => <Grape className={classname} />,
    cutting: (classname) => <Scissors className={classname} />,
    trimming: (classname) => <TreeDeciduous className={classname} />,
    treatment: (classname) => <FlaskRound className={classname} />,
    explantation: (classname) => <Shovel className={classname} />,
};

export const getVineyardActionIcon = (action: vineyardAction, className?: string) => {
    return vineyardActionIcon[action](className);
};
