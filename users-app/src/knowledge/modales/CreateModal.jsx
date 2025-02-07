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
            <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                            Crear nuevo tema
                            </h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label className="form-label">Título:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Contenido:</label>
                                    <textarea
                                        name="content"
                                        className="form-control textarea-grande"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary me-2">Crear</button>
                                <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}