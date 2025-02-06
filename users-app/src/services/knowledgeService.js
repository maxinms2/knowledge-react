import knowledgeApi from "../apis/knowledgeApi";

const BASE_URL = '';

export const find = async ({ content }) => {
    try {
        const response= await knowledgeApi.post(`${BASE_URL}/find`, {
            content
        });
        return response;
    } catch (error) {
        console.log("error1");
        throw error;
    }
};

export const tree = async ({ deep,id }) => {
    try {
        const response= await knowledgeApi.post(`${BASE_URL}/children`, {
            deep,
            id
        });
        return response;
    } catch (error) {
        console.log("error1");
        throw error;
    }
};

export const save = async ({ title,content,parent,id,parentId }) => {
    try {
        const response= await knowledgeApi.post(`${BASE_URL}`, {
            id,
            title,
            content,
            parent,
            parentId
        });
        return response;
    } catch (error) {
        console.log("error1: " +error);
        throw error;
    }
}

