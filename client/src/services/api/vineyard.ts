import { apiClient } from '@/services/api/client';
import { VineyardAdd, VineyardCutAdd, VineyardPlantingAdd, VineyardTrimAdd } from '@/types/vineyard';

export const getAll = async () => {
    const response = await apiClient.get('/vineyard');
    return response.data;
};

export const addVineyard = async (vineyard: VineyardAdd) => {
    const response = await apiClient.post('/vineyard', vineyard);
    return response.data;
};

export const addVineyardTrim = async (trim: VineyardTrimAdd) => {
    const trimData = {
        ...trim,
        date: trim.date.toISOString(),
    };

    const response = await apiClient.post('/vineyard/trim', trimData);
    return response.data;
};

export const addVineyardCut = async (cut: VineyardCutAdd) => {
    const cutData = {
        ...cut,
        date: cut.date.toISOString(),
    };

    const response = await apiClient.post('/vineyard/cut', cutData);
    return response.data;
};

export const addVineyardPlanting = async (planting: VineyardPlantingAdd) => {
    const plantingData = {
        ...planting,
        date: planting.date.toISOString(),
    };

    const response = await apiClient.post('/vineyard/planting', plantingData);
    return response.data;
};
