import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import {  modalStyles } from '../constants';
const CreateModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        createdAt: '',
        updatedAt: ''
    });

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
        
        formData.content = '';
        formData.title = '';
        formData.createdAt = '';
        formData.updatedAt = '';
    };

    return (
        <Modal
            style={modalStyles}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Crear nuevo tema"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Crear nuevo tema</h2>
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

                <button type="submit">Crear</button>
                <button type="button" onClick={onRequestClose}>Cancelar</button>
            </form>
        </Modal>
    );
};

export default CreateModal;

