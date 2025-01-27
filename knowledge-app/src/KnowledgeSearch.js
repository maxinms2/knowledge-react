import React, { useState } from "react";
import { API_URL, modalStyles } from './constants';
import Modal from 'react-modal';

const KnowledgeSearch = () => {
    const nullNode = {
        title: '',
        content: ''
    };
    const [inputText, setInputText] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedNode, setSelectedNode] = useState(nullNode); // Nodo seleccionado para editar
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    const openEditModal = async (result) => {
        try {

            setSelectedNode(result); // Guardar la información del nodo
            setEditModalIsOpen(true); // Abrir el modal de edición
        } catch (err) {
            setError(err.message); // Manejar errores
        }
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
        setSelectedNode(nullNode);
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const fetchResults = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL + "/api/knowledge/find", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: inputText }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Knowledge Search</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Enter text..."
                    className="w-full p-2 border rounded"
                />
            </div>
            <button
                onClick={fetchResults}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Search
            </button>

            {loading && <p className="mt-4 text-gray-500">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}

            <table className="mt-4 w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left"></th>
                        <th className="border border-gray-300 px-4 py-2 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result.id} className="border-t border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{result.title}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="icon-button" onClick={() => openEditModal(result)}>
                                    <i className="fas fa-file"></i> {/* Ícono de Font Awesome para "Crear hijo" */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <EditModal
                isOpen={editModalIsOpen}
                onRequestClose={closeEditModal}
                node={selectedNode}
            />
        </div>
    );
};



// Componente para el modal de edición
const EditModal = ({ isOpen, onRequestClose, node }) => {


    return (
        <Modal
            style={modalStyles}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Editar nodo"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>TEMA</h2>
            <div>
                <label>Título:</label>
                <input
                    type="text"
                    name="title"
                    value={node.title}
                />
            </div>
            <div>
                <label>Contenido:</label>
                <textarea
                    name="content"
                    value={node.content}
                />
            </div>
            <button type="button" onClick={onRequestClose}>Cerrar</button>
        </Modal>
    );
};


export default KnowledgeSearch;
