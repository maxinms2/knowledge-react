import axios from "axios";

const archivosApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/archivos`
});

archivosApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default archivosApi;