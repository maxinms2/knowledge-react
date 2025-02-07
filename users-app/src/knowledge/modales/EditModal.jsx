import React, { useState, useEffect } from 'react';

export const EditModal = ({ onRequestClose, node, onSubmit }) => {

    const [formData, setFormData] = useState({
        title: node ? node.title : '',
        content: node ? node.content : '',
        id: node ? node.id : 0
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
                id: node.id,
                title: node.title,
                content: node.content,
                createdAt: node.createdAt,
                updatedAt: node.updatedAt
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
                                <div className="mb-3">
                                    <textarea
                                        className="form-control textarea-grande"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                    <button type="submit" className="btn btn-primary me-2">Guardar</button>
                                    <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Cancelar</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>





    )
}