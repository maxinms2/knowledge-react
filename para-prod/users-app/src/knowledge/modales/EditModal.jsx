import React, { useState, useEffect } from 'react';
import FileUploadDownload from '../FileUploadDownload';

export const EditModal = ({ onRequestClose, node, onSubmit, parent, tipo }) => {

    const [formData, setFormData] = useState({
        title: node ? node.title : '',
        content: node ? node.content : '',
        id: node ? node.id : 0,
        tipo: node ? node.tipo : 1
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        console.log("parent " + parent);
        if (node) {
            setFormData({
                id: node.id,
                title: node.title,
                content: node.content,
                createdAt: node.createdAt,
                updatedAt: node.updatedAt,
                tipo: node.tipo
            });
        }
    }, [node]);

    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar tema</h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <select
                                        name="tipo"
                                        className="form-control"
                                        value={formData.tipo}
                                        onChange={handleInputChange}
                                    >
                                        <option value="1">Público</option>
                                        <option value="2">Privado</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <textarea
                                        className="form-control form-control-sm"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        required
                                        rows="3" // Reduce el número de líneas visibles
                                        style={{ height: "200px" }} // También puedes ajustar manualmente la altura
                                    />
                                </div>


                                {/* Componente de carga y descarga de archivos */}
                                <FileUploadDownload idKnow={node.id} />

                                {/* Botones de acción */}
                                <div className="mt-3">
                                    <button type="submit" className="btn btn-primary me-2">Guardar</button>
                                    <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Cancelar</button>
                                </div>


                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>





    )
}