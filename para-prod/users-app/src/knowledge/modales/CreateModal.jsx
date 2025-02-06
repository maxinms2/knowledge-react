import { useState } from "react";

export const CreateModal = ({ onRequestClose, onSubmit }) => {

    const [formData, setFormData] = useState({
        title: '',
        content: ''
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
    };

    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                            Crear nuevo tema
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

                                <button type="submit">Crear</button>
                                <button type="button" onClick={onRequestClose}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}