import { useLocation, useSearchParams } from 'react-router-dom';
import './KnowledgeTree.css';
import { useEffect, useState } from 'react';
import { tree, save,remove } from '../services/knowledgeService'
import { CreateModal } from './modales/CreateModal';
import { EditModal } from './modales/EditModal';
import Swal from 'sweetalert2';

export const KnowledgeTree = () => {

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
        console.log("id: " + defaultValue);
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

    // Función para obtener los datos del árbol
    const fetchTreeData = async () => {
        try {
            const response = await tree({
                deep: deep,
                id: id
            });
            console.log("response.data: " + response.data);
            setTreeData(response.data);
        } catch (err) {
            messageError("Error inesperado", "Por favor, intente más tarde");

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

    // Función para cerrar el modal de edición
    const closeEditModal = () => {
        setEditModalIsOpen(false);
        setSelectedNode(null);
    };

    // Función para abrir el modal de edición y obtener la información del nodo
    const openEditModal = async (id) => {
        try {
            setParentId(null);
            const response = await tree({
                deep: 1,
                id: id
            });
            // console.log("node===="+response.data);
            setSelectedNode(response.data); // Guardar la información del nodo
            setEditModalIsOpen(true); // Abrir el modal de edición
        } catch (err) {
            messageError("Error inesperado", "Por favor, intente más tarde");

        }
    };
    // Función para manejar la creación de un nuevo objeto
    const handleCreate = async (formData) => {
        try {
            // Crear el nuevo nodo
            console.log("parent: " + parentId);
            const response = await save({
                ...formData,
                parentId: parentId // Usar el parentId del nodo seleccionado
            });

            // Volver a obtener los datos del árbol
            await fetchTreeData();
            closeModal(); // Cerrar el modal de creación
            closeEditModal();
        } catch (err) {

        }
    };

    const deleteNodeAsync = async (id) => {
        try {
            await remove(id);
            await fetchTreeData();
        } catch (err) {
            messageError("Error inesperado", "Por favor, intente más tarde");
        }
    };

    const deleteNode = async (id) => {
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

    const updateTree = (id) => {

        if (id < 1) {
            id = 1;
        }
        console.log('id: ' + id)
        setDeep(1);
        setId(id);
    }


    // Renderizar el árbol de manera recursiva
    const renderTree = (node) => (
        <div key={node.id} className="tree-node">
            <div className="node-content">
                <span>{node.id}</span>
                <button className="icon-button" onClick={() => openModal(node.id)}> 
    <i className="fas fa-plus"></i> {/* Ícono de Font Awesome para crear/agregar */}
</button>
                <button className="icon-button" onClick={() => openEditModal(node.id)}>
                    <i className="fas fa-edit">Edit</i> {/* Ícono de Font Awesome para "Editar" */}
                </button>
                <button className="icon-button" onClick={() => deleteNode(node.id)}>
                    <i className="fas fa-trash">Delete</i> {/* Ícono de Font Awesome para "Editar" */}
                </button>
                <button className="icon-button" onClick={() => updateTree(node.parentId)}>
                    <i className="fas fa-arrow-left">&lt;</i> {/* Ícono de Font Awesome para "Editar" */}
                </button>
                <button className="icon-button" onClick={() => updateTree(node.id)}>
                    <i className="fas fa-arrow-right">&gt;</i> {/* Ícono de Font Awesome para "Editar" */}
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
            <h1>Árbol de temas</h1>
            <div>
                <label>ID:</label>
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
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
                {!modalIsOpen ||
                    <CreateModal
                        onRequestClose={closeModal}
                        onSubmit={handleCreate} />
                }

                {!editModalIsOpen ||
                    <EditModal
                        onRequestClose={closeEditModal}
                        node={selectedNode}
                        onSubmit={handleCreate}
                    />
                }
            </div>
        </div>
    )
}