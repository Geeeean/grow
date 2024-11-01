import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/services/react-query/client';
import { Vineyard } from '@/types/vineyard';
import { addVineyard } from '@/services/api/vineyard';

const addVineyardFn = async (vineyard: Vineyard) => {
    const result = await addVineyard(vineyard);
    return result.data;
};

export const useAddVineyard = () => {
    const client = useQueryClient();

    const {
        mutate: addVineyard,
        error,
        isPending,
        isSuccess,
    } = useMutation({
        mutationFn: addVineyardFn,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [QUERY_KEY.vineyards] });
        },
        retry: false,
    });

    return { addVineyard, error, isPending, isSuccess };
};
