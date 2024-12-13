import { apiClient } from '@/services/api/client';
import { NewVineyard, NewVineyardCut, NewVineyardTrim, NewVineyardPlanting } from '@/types/vineyard';

export const getAll = async () => {
    const response = await apiClient.get('/vineyard');
    return response.data;
};

export const newVineyard = async (vineyard: NewVineyard) => {
    const response = await apiClient.post('/vineyard', vineyard);
    return response.data;
};

export const newVineyardTrim = async (trim: NewVineyardTrim) => {
    const trimData = {
        ...trim,
        date: trim.date.toISOString(),
    };

    const response = await apiClient.post('/vineyard/trim', trimData);
    return response.data;
};

export const newVineyardCut = async (cut: NewVineyardCut) => {
    const cutData = {
        ...cut,
        date: cut.date.toISOString(),
    };

    const response = await apiClient.post('/vineyard/cut', cutData);
    return response.data;
};

export const newVineyardPlanting = async (planting: NewVineyardPlanting) => {
    const plantingData = {
        ...planting,
        action: {
            ...planting.action,
            date: planting.action.date.toISOString(),
        },
    };

    const response = await apiClient.post('/vineyard/planting', plantingData);
    return response.data;
};
