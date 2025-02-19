import React, { useState } from "react";
import { loadFile, downloadFile } from '../services/archivosService';
import { warningError } from "../services/messages";

const FileUploadDownload = ({ idKnow }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [downloadedFile, setDownloadedFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    console.log('file:'+ file);
    if (!file || file==null) return warningError("Error", "Selecciona un archivo");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64File = reader.result.split(",")[1];
      loadFile({ archivo: base64File, nombre: file.name, idKnow });
    };
  };

  const handleDownload = async () => {

    try {
        console.log('ojo44: '+idKnow);
      const response = await downloadFile(idKnow);
      const base64String = response.data.archivo;
      const blob = new Blob([Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0))], {
        type: "application/octet-stream"
      });

      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = response.data.nombre || "archivo_descargado";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      warningError("Warning", "No hay archivo vinculado o error al descargar");
    }
  };

  return (
    <div className="container mt-2">
      <div className="card shadow-sm p-2">
        
        {/* Input de Archivo */}
        <div className="mb-2">
          <input type="file" className="form-control form-control-sm" onChange={handleFileChange} />
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary btn-sm" onClick={handleUpload}>
            📤 Subir
          </button>
          <button className="btn btn-success btn-sm" onClick={handleDownload}>
            📥 Descargar
          </button>
        </div>

        {/* Enlace de Descarga */}
        {downloadedFile && (
          <div className="mt-2 text-center">
            <a href={downloadedFile} download={fileName} className="btn btn-link btn-sm">
              ⬇️ Descargar Archivo
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadDownload;
