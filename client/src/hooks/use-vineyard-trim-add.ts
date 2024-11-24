import { addVineyardTrim } from '@/services/api/vineyard';
import { VineyardTrimAdd } from '@/types/vineyard';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const vineyardTrimAddFn = async (trim: VineyardTrimAdd) => {
    const result = await addVineyardTrim(trim);
    return result.data;
};

export const useVineyardTrimAdd = () => {
    const client = useQueryClient();

    const {
        mutate: vineyardTrimAdd,
        error,
        isPending,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: vineyardTrimAddFn,
        onSuccess: () => {
            //client.invalidateQueries({ queryKey: [QUERY_KEY.vineyards] });
        },
        retry: false,
    });

    return { vineyardTrimAdd, isSuccess, error, isPending, reset };
};
