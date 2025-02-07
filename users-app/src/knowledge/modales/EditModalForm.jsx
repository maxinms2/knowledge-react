export const EditModalForm = ({onRequestClose,node}) => {

    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Tema
                            </h5>
                        </div>
                        <div className="modal-body">
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={node.title}
                                />
                            </div>
                            <div>
                                <textarea
                                    className="form-control textarea-grande"
                                    name="content"
                                    value={node.content}
                                />
                            </div>
                            <button type="button" onClick={onRequestClose}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
