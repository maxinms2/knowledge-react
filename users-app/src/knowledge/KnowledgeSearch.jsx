import { useState } from "react";
import { API_URL, modalStyles } from './constants';
import { find } from '../services/knowledgeService';
import { EditModalForm } from "./modales/EditModalForm";
import { Link } from "react-router-dom";

export const KnowledgeSearch = () => {
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
        console.log("fetch2");
        try {

            const response = await find({ content: inputText });
            console.log("data: " + response.data)
            console.log("response.ok: " + response.status);
            if (response.status != 200) {
                throw new Error(`Error: ${response.statusText}`);
            }

            //const data = await response.json();
            setResults(response.data);
        } catch (err) {
            //console.log("error3: ");
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 w-full">
            {!editModalIsOpen ||

                <EditModalForm
                    onRequestClose={closeEditModal}
                    node={selectedNode}
                />
            }
            <h1 className="text-xl font-bold mb-4 text-center">Knowledge Search</h1>

            <div className="mb-4">
                <input
                    type="text"
                    style={{ width: "400px" }}
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Enter text..."
                    className="w-full p-2 border rounded"
                />
            </div>

            <button
                onClick={fetchResults}
                className="w-full py-3 px-4 bg-blue-500 text-black text-lg font-bold rounded hover:bg-blue-600 border border-blue-700"
            >
                Search
            </button>

            {loading && <p className="mt-4 text-gray-500 text-center">Loading...</p>}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

            <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.id} className="border-t border-gray-300">
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="icon-button" onClick={() => openEditModal(result)}>
                                        <i className="fas fa-file">Abrir</i> {/* Ícono de Font Awesome para "Crear hijo" */}
                                    </button>
                                </td>
                                <Link to={`/know/tree?id=${result.id}`}>
                                    Árbol de temas
                                </Link>
                                <td className="px-4 py-2">{result.content}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!editModalIsOpen ||

                    <EditModalForm
                        onRequestClose={closeEditModal}
                        node={selectedNode} />
                }

            </div>
        </div>


    )
}



