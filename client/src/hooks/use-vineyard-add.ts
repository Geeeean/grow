import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/services/react-query/client';
import { VineyardAdd } from '@/types/vineyard';
import { addVineyard } from '@/services/api/vineyard';

const vineyardAddFn = async (vineyard: VineyardAdd) => {
    const result = await addVineyard(vineyard);
    return result.data;
};

export const useVineyardAdd = () => {
    const client = useQueryClient();

    const {
        mutate: vineyardAdd,
        error,
        isPending,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: vineyardAddFn,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [QUERY_KEY.vineyards] });
        },
        retry: false,
    });

    return { vineyardAdd, error, isPending, isSuccess, reset };
};
