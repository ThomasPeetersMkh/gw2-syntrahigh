import "./crudmodal.scss";
import { IoCloseCircleOutline } from "react-icons/io5";
const CrudModal = ({ setShowModal, children }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="icon_close modal__content__icon">
          <IoCloseCircleOutline onClick={() => setShowModal(false)} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default CrudModal;
