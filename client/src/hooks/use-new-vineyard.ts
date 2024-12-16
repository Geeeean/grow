import { useQueryClient, useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@/services/react-query/client';
import { NewVineyard, Vineyard } from '@/types/vineyard';
import { newVineyard } from '@/services/api/vineyard';

const newVineyardFn = async (vineyard: NewVineyard) => {
    const result = await newVineyard(vineyard);
    return result.data;
};

export const useNewVineyard = () => {
    const client = useQueryClient();

    const {
        mutate: newVineyard,
        error,
        isPending,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: newVineyardFn,
        onSuccess: (newVineyardData) => {
            client.setQueryData([QUERY_KEY.vineyards], (oldData: Vineyard[]) => {
                if (!oldData) {
                    return [newVineyardData];
                }

                return [...oldData, newVineyardData];
            });
        },
        retry: false,
    });

    return { newVineyard, error, isPending, isSuccess, reset };
};
