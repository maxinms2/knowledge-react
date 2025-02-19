import Swal from "sweetalert2";

export const messageOK = (title, message) => {
    Swal.fire({
        title: title,
        text: message,
        icon: "Aceptar",
        confirmButtonText: "Aceptar"
    });
};

export const messageError = (title, message) => {
    Swal.fire({
        title: title,
        text: message,
        icon: "error",
        confirmButtonText: "Aceptar"
    });
};

export const warningError = (title, message) => {
    Swal.fire({
        title: title,
        text: message,
        icon: "warning",
        confirmButtonText: "Aceptar"
    });
};

export const confirmMessage = async (title, message) => {
    const result= Swal.fire({
        title: title,
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        return true;
    }
    return false;
}