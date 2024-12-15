import { apiClient } from '@/services/api/client';
import { Credentials } from '@/types/auth';

export const signIn = async (credentials: Credentials) => {
    const response = await apiClient.post('/auth/signin', credentials);
    return response.data;
};

export const signOut = async () => {
    const response = await apiClient.post('/auth/signout');
    return response.data;
};
