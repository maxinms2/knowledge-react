import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './KnowledgeTree.css';

const KnowledgeTree = () => {
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

  // Función para obtener los datos del árbol
  const fetchTreeData = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/knowledge/children', {
        deep: 6,
        id: 1
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
      const response = await axios.post('http://localhost:8080/api/knowledge/children', {
        deep: 1,
        id: id
      });
      setSelectedNode(response.data); // Guardar la información del nodo
      setEditModalIsOpen(true); // Abrir el modal de edición
    } catch (err) {
      setError(err.message); // Manejar errores
    }
  };

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setSelectedNode(null);
  };

  // Función para manejar la creación de un nuevo objeto
  const handleCreate = async (formData) => {
    try {
      // Crear el nuevo nodo
      await axios.post('http://localhost:8080/api/knowledge', {
        ...formData,
        parentId: parentId // Usar el parentId del nodo seleccionado
      });

      // Volver a obtener los datos del árbol
      await fetchTreeData();

      closeModal(); // Cerrar el modal de creación
    } catch (err) {
      setError(err.message); // Manejar errores
    }
  };

  // Función para manejar la edición de un objeto
  const handleEdit = async (formData) => {
    try {
      // Editar el nodo
      await axios.put(`http://localhost:8080/api/knowledge/${selectedNode.id}`, formData);

      // Volver a obtener los datos del árbol
      await fetchTreeData();

      closeEditModal(); // Cerrar el modal de edición
    } catch (err) {
      setError(err.message); // Manejar errores
    }
  };

  // Renderizar el árbol de manera recursiva
  const renderTree = (node) => (
    <div key={node.id} className="tree-node">
      <div className="node-content">
        <span>{node.title}</span>
        <button className="icon-button" onClick={() => openModal(node.id)}>
          <i className="fas fa-plus"></i> {/* Ícono de Font Awesome para "Crear hijo" */}
        </button>
        <button className="icon-button" onClick={() => openEditModal(node.id)}>
          <i className="fas fa-edit"></i> {/* Ícono de Font Awesome para "Editar" */}
        </button>
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
        onSubmit={handleEdit}
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
  };

  return (
    <Modal
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
        <div>
          <label>Created At:</label>
          <input
            type="date"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Updated At:</label>
          <input
            type="date"
            name="updatedAt"
            value={formData.updatedAt}
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
    updatedAt: node ? node.updatedAt : ''
  });

  useEffect(() => {
    if (node) {
      setFormData({
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
        <div>
          <label>Created At:</label>
          <input
            type="date"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Updated At:</label>
          <input
            type="date"
            name="updatedAt"
            value={formData.updatedAt}
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