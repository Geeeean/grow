import { newVineyardTrim } from '@/services/api/vineyard';
import { QUERY_KEY } from '@/services/react-query/client';
import { ApiResponse } from '@/types/shared';
import { NewVineyardTrim, Vineyard, VineyardTrim } from '@/types/vineyard';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const newVineyardTrimFn = async (trim: NewVineyardTrim) => {
    const result: ApiResponse<VineyardTrim> = await newVineyardTrim(trim);
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
        onSuccess: (newTrimData) => {
            client.setQueryData([QUERY_KEY.vineyards], (oldData: Vineyard[]) => {
                if (!oldData) {
                    return [];
                }

                const vineyardId = newTrimData.vineyardId;

                return oldData.map((vineyard) => {
                    if (vineyard.id === vineyardId) {
                        return {
                            ...vineyard,
                            trims: [...(vineyard.trims || []), newTrimData],
                        };
                    }
                    return vineyard;
                });
            });
        },
        retry: false,
    });

    return { newVineyardTrim, isSuccess, error, isPending, reset };
};
