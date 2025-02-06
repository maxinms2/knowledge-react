import axios from 'axios';
import { API_URL } from '../knowledge/Constants';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const postApi = async (url, data) => {
    const response = await apiClient.post(url, data);
    return response.data;
};

export const deleteApi = async (url) => {
    await apiClient.delete(url);
};