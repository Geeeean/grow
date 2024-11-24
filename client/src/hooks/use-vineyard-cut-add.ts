import { addVineyardCut } from '@/services/api/vineyard';
import { VineyardCutAdd } from '@/types/vineyard';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const vineyardCutAddFn = async (cut: VineyardCutAdd) => {
    const result = await addVineyardCut(cut);
    return result;
};

export const useVineyardCutAdd = () => {
    const client = useQueryClient();

    const {
        mutate: vineyardCutAdd,
        error,
        isPending,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: vineyardCutAddFn,
        onSuccess: () => {
            //client.invalidateQueries({ queryKey: [QUERY_KEY.vineyards] });
        },
        retry: false,
    });

    return { vineyardCutAdd, isSuccess, error, isPending, reset };
};
