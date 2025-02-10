import { useEffect, useState } from "react";

export const CreateModal = ({ onRequestClose, onSubmit, id,parent ,tipo}) => {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tipo: 1
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



        setFormData({
            ...formData,
        });

        formData.content = '';
        formData.title = '';
        formData.tipo = 2;
    };



    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Crear subtema de "{parent}"
                            </h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <button type="submit" className="btn btn-primary me-2">Crear</button>
                                <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Cancelar</button>
                                {tipo >1 || <div>
                                    <select
                                        name="tipo"
                                        className="form-control"
                                        value={formData.tipo}
                                        onChange={handleInputChange}
                                    >
                                        <option value="1">Público</option>
                                        <option value="2">Privado</option>
                                    </select>
                                </div>}
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


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}