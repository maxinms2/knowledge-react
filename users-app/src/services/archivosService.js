import archivosApi from "../apis/archivosApi";

const BASE_URL = '';

const lanzaError=(error)=>{
    let errorMessage = "Ocurrió un error inesperado.";
    let errorStatus = "Desconocido";
    console.log('error: '+error.message );
    console.log('errorss: '+error.status );
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
    /*if(err)
    console.log("err serv: "+errorStatus);
    // Lanza el error como objeto con `status` y `message`
    throw { status: errorStatus, message: errorMessage };*/

}

export const loadFile = async ({ archivo,nombre,idKnow }) => {
    
    try {
        console.log('archivo: '+ archivo);
        
        const id = typeof idKnow === "object" && idKnow.idKnow ? idKnow.idKnow : idKnow;
        console.log("Valor de idKnow:", id);
        const response= await archivosApi.post(`${BASE_URL}/subir/${id}`, {
            archivo,
            nombre
        });
        return response;
    } catch (error) {
        lanzaError(error);
    }
};

export const downloadFile = async (idKnow ) => {
    
    try {
        console.log("idkn "+idKnow);
        const id = typeof idKnow === "object" && idKnow.idKnow ? idKnow.idKnow : idKnow;
        console.log("Valor de idKnow:", id);
        const response= await archivosApi.get(`${BASE_URL}/descargar/${id}`);
        return response;
    } catch (error) {
        lanzaError(error);
    }
};

