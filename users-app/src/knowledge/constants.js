export const API_URL = "http://localhost:8080";

export const modalStyles = {
  content: {
    position: "absolute", // Asegúrate de que sea "absolute"
    top: "50%",           // Centrado vertical (opcional)
    left: "50%",          // Centrado horizontal
    transform: "translate(-50%, -50%)", // Centrado total
    maxWidth: "90%",
    width: "600px",
    maxHeight: "85vh",
    overflow: "auto",     // Maneja contenido largo
    borderRadius: "8px",  // Opcional: bordes redondeados
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Opcional: sombra
    padding: "20px",      // Opcional: espaciado interno
    backgroundColor: "#fff", // Fondo blanco por defecto
  },
};