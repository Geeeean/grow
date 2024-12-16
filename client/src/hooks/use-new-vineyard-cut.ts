import { newVineyardCut } from '@/services/api/vineyard';
import { QUERY_KEY } from '@/services/react-query/client';
import { ApiResponse } from '@/types/shared';
import { NewVineyardCut, Vineyard, VineyardCut } from '@/types/vineyard';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const newVineyardCutFn = async (cut: NewVineyardCut) => {
    const result: ApiResponse<VineyardCut> = await newVineyardCut(cut);
    return result.data;
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
        onSuccess: (newCutData) => {
            client.setQueryData([QUERY_KEY.vineyards], (oldData: Vineyard[]) => {
                if (!oldData) {
                    return [];
                }

                const vineyardId = newCutData.vineyardId;

                return oldData.map((vineyard) => {
                    if (vineyard.id === vineyardId) {
                        return {
                            ...vineyard,
                            cuts: [...(vineyard.cuts || []), newCutData],
                        };
                    }
                    return vineyard;
                });
            });
        },
        retry: false,
    });

    return { newVineyardCut, isSuccess, error, isPending, reset };
};
