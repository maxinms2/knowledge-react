import knowledgeApi from "../apis/knowledgeApi";

const BASE_URL = '';

export const find = async ({ content }) => {
    try {
        const response= await knowledgeApi.post(BASE_URL, {
            content
        });
        return response;
    } catch (error) {
        console.log("error1");
        throw error;
    }
}

