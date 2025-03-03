import { useLocation, useSearchParams } from 'react-router-dom';
import './KnowledgeTree.css';
import { useEffect, useState } from 'react';
import { tree, save, remove } from '../services/knowledgeService'
import { messageError } from '../services/messages'
import { CreateModal } from './modales/CreateModal';
import { EditModal } from './modales/EditModal';
import "@fortawesome/fontawesome-free/css/all.min.css";
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
    const [parent, setParent] = useState('');
    const [deep, setDeep] = useState(1);
    const [parentNode, setParentNode] = useState(0);
    const [treeData, setTreeData] = useState(null); // Datos del árbol
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Manejo de errores
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado del modal de creación
    const [editModalIsOpen, setEditModalIsOpen] = useState(false); // Estado del modal de edición
    const [parentId, setParentId] = useState(null); // ID del padre para el nuevo objeto
    const [selectedNode, setSelectedNode] = useState(null); // Nodo seleccionado para editar
    const [tipo, setTipo] = useState(0);
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
    const openModal = (id, title, tipoNod) => {
        setParentId(id);
        setParent(title);
        setModalIsOpen(true);
        setTipo(tipoNod);
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
    const openEditModal = async (id, parentNodeId,tipoNod) => {
        try {
            setParentId(null);
            setParentNode(parentNodeId);
            const response = await tree({
                deep: 1,
                id: id
            });
            // console.log("node===="+response.data);
            setSelectedNode(response.data); // Guardar la información del nodo
            setEditModalIsOpen(true); // Abrir el modal de edición
            setTipo(tipoNod);
        } catch (err) {

            messageError("Error inesperado", "Por favor, intente más tarde");

        }
    };
    // Función para manejar la creación de un nuevo objeto
    const handleCreate = async (formData) => {
        try {
            console.log("ojo");
            // Crear el nuevo nodo
            console.log("parent: " + parentId);
            console.log("type: " + formData.tipo);
            const response = await save({
                ...formData,
                parentId: parentId // Usar el parentId del nodo seleccionado
            });

            // Volver a obtener los datos del árbol
            await fetchTreeData();
            closeModal(); // Cerrar el modal de creación
            closeEditModal();
        } catch (err) {
            messageError("Error", err.message);
        }
    };

    const deleteNodeAsync = async (id) => {
        try {
            await remove(id);
            await fetchTreeData();
        } catch (err) {
            console.log("Errorrrr: "+err.status)
            if(err.status==403){
                messageError("Error", "No es el creador del tema");
            }else{
                messageError("Error", "Error inesperado, inténtelo nuevamente");
            }
            
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
                console.log('id: ' + id);
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
                <button className="icon-button" onClick={() => openModal(node.id, node.title, node.tipo)} title="Crear nuevo tema">
                    <i className="fas fa-plus"></i> {/* Ícono de Font Awesome para crear/agregar */}
                </button>
                <button className="icon-button" onClick={() => openEditModal(node.id, node.parentId, node.tipo)} title="Editar tema">
                    <i className="fas fa-edit"></i> {/* Ícono de Font Awesome para "Editar" */}
                </button>
                <button className="icon-button" onClick={() => deleteNode(node.id)} title="Eliminar tema">
                    <i className="fas fa-trash"></i> {/* Ícono de Font Awesome para "Editar" */}
                </button>
                <button className="icon-button" onClick={() => updateTree(node.parentId)} title="Ver temas del tema base">
                    <i className="fas fa-arrow-left"></i> {/* Ícono de Font Awesome para "Editar" */}
                </button>
                <button className="icon-button" onClick={() => updateTree(node.id)} title="Ver subtemas">
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
            <h1>Árbol de temas</h1>
            <div>
                <div className="form-container">
                    <div className="form-container">
                        <div className="form-group">
                            <label>ID:</label>
                            <input
                                type="number"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Deep:</label>
                            <input
                                type="number"
                                value={deep}
                                onChange={(e) => setDeep(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                </div>

                {treeData && renderTree(treeData)}
                {!modalIsOpen ||
                    <CreateModal
                        onRequestClose={closeModal}
                        onSubmit={handleCreate}
                        parent={parent}
                        id={parentId}
                        tipo={tipo}
                    />

                }

                {!editModalIsOpen ||
                    <EditModal
                        onRequestClose={closeEditModal}
                        node={selectedNode}
                        onSubmit={handleCreate}
                        parent={parentNode}
                        tipo={tipo}
                    />
                }
            </div>
        </div>
    )
}