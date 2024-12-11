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
        date: trim.date.toISOString(),
    };

    const response = await apiClient.post('/vineyard/' + trim.vineyardId + '/trim/add', trimData);
    return response.data;
};

export const addVineyardCut = async (cut: VineyardCutAdd) => {
    const cutData = {
        date: cut.date.toISOString(),
    };

    const response = await apiClient.post('/vineyard/' + cut.vineyardId + '/cut/add', cutData);
    return response.data;
};

export const addVineyardPlanting = async (planting: VineyardPlantingAdd) => {
    const plantingData = {
        date: planting.date.toISOString(),
        plantingType: planting.plantingType,
    };

    const response = await apiClient.post('/vineyard/' + planting.vineyardId + '/planting/add', plantingData);
    return response.data;
};
