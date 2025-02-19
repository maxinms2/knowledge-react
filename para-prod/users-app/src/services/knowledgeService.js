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
    console.log('BASE_URL0: '+ BASE_URL);
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

export const save = async ({ title,content,parent,id,parentId,tipo }) => {
    try {
        const response= await knowledgeApi.post(`${BASE_URL}`, {
            id,
            title,
            content,
            parent,
            parentId,
            tipo
        });
        return response;
    } catch (error) {
        lanzaError(error);
    }
};

export const remove = async (id) => {
    try {
        await knowledgeApi.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        throw error;
        //lanzaError(error);
    }
}

const lanzaError=(error)=>{
    let errorMessage = "Ocurrió un error inesperado.";
    let errorStatus = "Desconocido";
    console.log('error: '+error.message );
    if (error.response) {
        errorStatus = error.response.status;
        // Verifica si el mensaje es un objeto y conviértelo a string si es necesario
        if (typeof error.response.data === "object") {
            errorMessage = JSON.stringify(error.response.data);
        } else {
            errorMessage = error.response.data;
        }
    } else if (error.message) {
        errorMessage = error.message;
    }
    if(err)
    console.log("err serv: "+errorStatus);
    // Lanza el error como objeto con `status` y `message`
    throw { status: errorStatus, message: errorMessage };

}

