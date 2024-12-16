import { newVineyardPlanting } from '@/services/api/vineyard';
import { QUERY_KEY } from '@/services/react-query/client';
import { ApiResponse } from '@/types/shared';
import { NewVineyardPlanting, Vineyard, VineyardPlanting } from '@/types/vineyard';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const newVineyardPlantingFn = async (planting: NewVineyardPlanting) => {
    const result: ApiResponse<VineyardPlanting> = await newVineyardPlanting(planting);
    return result.data;
};

export const useNewVineyardPlanting = () => {
    const client = useQueryClient();

    const {
        mutate: newVineyardPlanting,
        error,
        isPending,
        isSuccess,
        reset,
    } = useMutation({
        mutationFn: newVineyardPlantingFn,
        onSuccess: (newPlantingData) => {
            client.setQueryData([QUERY_KEY.vineyards], (oldData: Vineyard[]) => {
                if (!oldData) {
                    return [];
                }

                const vineyardId = newPlantingData.action.vineyardId;

                return oldData.map((vineyard) => {
                    if (vineyard.id === vineyardId) {
                        return {
                            ...vineyard,
                            plantings: [...(vineyard.plantings || []), newPlantingData],
                        };
                    }
                    return vineyard;
                });
            });
        },
        retry: false,
    });

    return { newVineyardPlanting, isSuccess, error, isPending, reset };
};
