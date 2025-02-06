import axios from "axios";

const knowledgeApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/knowledge`
});

knowledgeApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': sessionStorage.getItem('token'),
    }
    return config;
});

export default knowledgeApi;