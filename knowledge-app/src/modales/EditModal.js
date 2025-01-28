import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import {  modalStyles } from '../constants';
const EditModal = ({ isOpen, onRequestClose, node, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: node ? node.title : '',
        content: node ? node.content : '',
        createdAt: node ? node.createdAt : '',
        updatedAt: node ? node.updatedAt : '',
        id:node ? node.id : 0
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal
            style={modalStyles}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Editar tema"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Editar tema</h2>
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
        </Modal>
    );
};

export default EditModal;
