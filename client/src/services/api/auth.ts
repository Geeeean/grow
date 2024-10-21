import { apiClient } from '@/services/api/client';
import { Credentials } from '@/types/auth';

export const signIn = async (credentials: Credentials) => {
    const response = await apiClient.post('/auth/signin', credentials);
    return response.data;
};
