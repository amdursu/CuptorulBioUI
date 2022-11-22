import { Dialog } from "@mui/material";
import { IModal } from "./Modal.interface";
import styles from "./Modal.module.scss";

const Modal = ({ visible, handleClose, title, children }: IModal) => {
  return (
    <Dialog onClose={handleClose} open={visible}>
      <div className={styles.modalTitle}>{title}</div>
      {children}
    </Dialog>
  );
};

export default Modal;
