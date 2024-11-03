import { VineyardCutAdd } from '@/types/vineyard';

export const useVineyardCutAdd = () => {
    const cut = ({ vineyardId, date }: VineyardCutAdd) => {
        console.log(vineyardId, date);
    };
    const isSuccess = false;
    const error = false;
    const isPending = false;
    const reset = () => {};

    return { cut, isSuccess, error, isPending, reset };
};
