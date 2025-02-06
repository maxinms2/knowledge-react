import React, { useState, useEffect } from 'react';

export const EditModal = ({onRequestClose,node,onSubmit}) => {

    const [formData, setFormData] = useState({
        title: node ? node.title : '',
        content: node ? node.content : '',
        id:node ? node.id : 0
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
        if (node) {
            setFormData({
                id:node.id,
                title: node.title,
                content: node.content,
                createdAt: node.createdAt,
                updatedAt: node.updatedAt
            });
        }
    }, [node]);

    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Editar tema
                            </h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Título:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Contenido:</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <button type="submit">Guardar</button>
                                <button type="button" onClick={onRequestClose}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}