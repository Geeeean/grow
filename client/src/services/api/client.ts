import axios from 'axios';

//const API_URL = import.meta.env.API_URL;
const API_URL = 'http://localhost:3000/api';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
});
