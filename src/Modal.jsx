import "./Modal.css";

const Modal = ({ isOpen, onClose, confirmEliminar, cancelEliminar }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay custom-modal">
      <div className="modal-content">
        <h3>¿Desea eliminar este Usuario definitivamente?</h3>
        <div className="modal-buttons">
          <button className="modal-button accept-button" onClick={confirmEliminar}>
            Aceptar
          </button>
          <button className="modal-button cancel-button" onClick={cancelEliminar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
