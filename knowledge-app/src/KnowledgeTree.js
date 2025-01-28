import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './KnowledgeTree.css';
import { API_URL, modalStyles } from './constants';
import { useLocation, useSearchParams } from 'react-router-dom';
import Swal from "sweetalert2";

const KnowledgeTree = () => {
    // Función para obtener valores iniciales
    const getInitialValue = (key, defaultValue) => {
        // Prioriza el estado de navegación
        if (location.state?.[key] !== undefined) {
            return location.state[key];
        }

        // Si no hay estado, busca en los parámetros de la URL
        const urlValue = searchParams.get(key);
        if (urlValue) {
            return isNaN(urlValue) ? defaultValue : Number(urlValue);
        }

        // Valor por defecto si no hay nada
        return defaultValue;
    };
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [id, setId] = useState(() => getInitialValue('id', 1));
    const [deep, setDeep] = useState(1);
    const [treeData, setTreeData] = useState(null); // Datos del árbol
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Manejo de errores
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado del modal de creación
    const [editModalIsOpen, setEditModalIsOpen] = useState(false); // Estado del modal de edición
    const [parentId, setParentId] = useState(null); // ID del padre para el nuevo objeto
    const [selectedNode, setSelectedNode] = useState(null); // Nodo seleccionado para editar



    // Obtener los datos del árbol al cargar el componente
    useEffect(() => {
        fetchTreeData();
    }, []);

    useEffect(() => {
        if (id !== null) {
            fetchTreeData();
        }
    }, [id, deep]); // Escucha cambios en `id` o `deep`
    const updateTree = (id) => {
        
        if(id<1){
            id=1;
        }
        console.log('id: '+id)
        setDeep(1);
        setId(id);
    }


    // Función para obtener los datos del árbol
    const fetchTreeData = async () => {
        try {

            const response = await axios.post(API_URL + '/api/knowledge/children', {
                deep: deep,
                id: id
            });
            setTreeData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Función para abrir el modal de creación y establecer el parentId
    const openModal = (id) => {
        setParentId(id);
        setModalIsOpen(true);
    };

    // Función para cerrar el modal de creación
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Función para abrir el modal de edición y obtener la información del nodo
    const openEditModal = async (id) => {
        try {

            const response = await axios.post(API_URL + '/api/knowledge/children', {
                deep: 1,
                id: id
            });
            // console.log("node===="+response.data);
            setSelectedNode(response.data); // Guardar la información del nodo
            setEditModalIsOpen(true); // Abrir el modal de edición
        } catch (err) {
            setError(err.message); // Manejar errores
        }
    };



    const deleteNodeAsync = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/knowledge/${id}`);

            await fetchTreeData();
        } catch (err) {
            setError(err.message); // Manejar errores
        }
    };

    const deleteNode = (id) => {
        console.log(id);
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción. Se borrarán todos los hijos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('id: '+id);
                deleteNodeAsync(id);
            } 
        });
    };

    // Función para cerrar el modal de edición
    const closeEditModal = () => {
        setEditModalIsOpen(false);
        //setSelectedNode(null);
    };

    // Función para manejar la creación de un nuevo objeto
    const handleCreate = async (formData) => {
        try {
            // Crear el nuevo nodo
            await axios.post(API_URL + '/api/knowledge', {
                ...formData,
                parentId: parentId // Usar el parentId del nodo seleccionado
            });

            // Volver a obtener los datos del árbol
            await fetchTreeData();
            closeModal(); // Cerrar el modal de creación
            closeEditModal();
        } catch (err) {
            setError(err.message); // Manejar errores
        }
    };


    // Renderizar el árbol de manera recursiva
    const renderTree = (node) => (
        <div key={node.id} className="tree-node">
            <div className="node-content">
                <span>{node.id}</span>

                <button className="icon-button" onClick={() => openModal(node.id)}>
                    <i className="fas fa-save"></i> {/* Ícono de Font Awesome para "Crear hijo" */}
                </button>
                <button className="icon-button" onClick={() => openEditModal(node.id)}>
                    <i className="fas fa-edit"></i> {/* Ícono de Font Awesome para "Editar" */}
                </button>
                <button className="icon-button" onClick={() => deleteNode(node.id)}>
                    <i className="fas fa-trash"></i> {/* Ícono de Font Awesome para "Editar" */}
                </button>
                <button className="icon-button" onClick={() => updateTree(node.parentId)}>
                    <i className="fas fa-arrow-left"></i> {/* Ícono de Font Awesome para "Editar" */}
                </button>
                <button className="icon-button" onClick={() => updateTree(node.id)}>
                    <i className="fas fa-arrow-right"></i> {/* Ícono de Font Awesome para "Editar" */}
                </button>

                <span>{node.title}</span>
            </div>
            {node.children.length > 0 && (
                <div className="children">
                    {node.children.map((child) => renderTree(child))}
                </div>
            )}
        </div>
    );

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="knowledge-tree">
            <div>
                <label>ID:</label>
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Deep:</label>
                <input
                    type="number"
                    value={deep}
                    onChange={(e) => setDeep(e.target.value)}
                    required
                />
            </div>
            {treeData && renderTree(treeData)}
            <CreateModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onSubmit={handleCreate}
            />
            <EditModal
                isOpen={editModalIsOpen}
                onRequestClose={closeEditModal}
                node={selectedNode}
                onSubmit={handleCreate}
            />
        </div>
    );
};

// Componente para el modal de creación
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
            contentLabel="Crear nuevo objeto"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Crear nuevo objeto</h2>
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

// Componente para el modal de edición
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
            contentLabel="Editar nodo"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Editar nodo</h2>
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

export default KnowledgeTree;