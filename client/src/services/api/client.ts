import axios from 'axios';

const API_BASE_URL = process.env.API_URL;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
});
