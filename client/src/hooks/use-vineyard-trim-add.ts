import { VineyardTrimAdd } from '@/types/vineyard';

export const useVineyardTrimAdd = () => {
    const trim = ({ vineyardId, date }: VineyardTrimAdd) => {
        console.log(vineyardId, date);
    };
    const isSuccess = false;
    const error = false;
    const isPending = false;
    const reset = () => {};

    return { trim, isSuccess, error, isPending, reset };
};
