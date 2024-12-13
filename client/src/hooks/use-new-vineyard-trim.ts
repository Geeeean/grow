import { newVineyardTrim } from '@/services/api/vineyard';
import { QUERY_KEY } from '@/services/react-query/client';
import { NewVineyardTrim } from '@/types/vineyard';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const newVineyardTrimFn = async (trim: NewVineyardTrim) => {
    const result = await newVineyardTrim(trim);
    return result.data;
};

export const useNewVineyardTrim = () => {
    const client = useQueryClient();

    const {
        mutate: newVineyardTrim,
        error,
        isPending,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: newVineyardTrimFn,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [QUERY_KEY.vineyards] });
        },
        retry: false,
    });

    return { newVineyardTrim, isSuccess, error, isPending, reset };
};
