import { newVineyardCut } from '@/services/api/vineyard';
import { NewVineyardCut } from '@/types/vineyard';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const newVineyardCutFn = async (cut: NewVineyardCut) => {
    const result = await newVineyardCut(cut);
    return result;
};

export const useNewVineyardCut = () => {
    const client = useQueryClient();

    const {
        mutate: newVineyardCut,
        error,
        isPending,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: newVineyardCutFn,
        onSuccess: () => {
            //client.invalidateQueries({ queryKey: [QUERY_KEY.vineyards] });
        },
        retry: false,
    });

    return { newVineyardCut, isSuccess, error, isPending, reset };
};
