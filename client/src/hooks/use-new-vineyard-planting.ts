import { newVineyardPlanting } from '@/services/api/vineyard';
import { QUERY_KEY } from '@/services/react-query/client';
import { NewVineyardPlanting } from '@/types/vineyard';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const newVineyardPlantingFn = async (planting: NewVineyardPlanting) => {
    const result = await newVineyardPlanting(planting);
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
        onSuccess: () => {
            client.invalidateQueries({ queryKey: [QUERY_KEY.vineyards] });
        },
        retry: false,
    });

    return { newVineyardPlanting, isSuccess, error, isPending, reset };
};
