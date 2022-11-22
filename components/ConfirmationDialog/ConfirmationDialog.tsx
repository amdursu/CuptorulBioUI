import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { IConfirmationDialog } from "./ConfirmationDialog.interface";
import styles from "./ConfirmationDialog.module.scss";
import toastOptions from "../../utils/toastOptions";

const ConfirmationDialog = ({
  setModalVisible,
  confirmationComponent,
  confirmAction,
  toast,
}: IConfirmationDialog) => {
  const confirmationDialog = () => {
    confirmAction();
    setModalVisible(false);
  };
  const cancel = () => {
    toast.warn("Operatiune anulata !", toastOptions);
    setModalVisible(false);
  };

  return (
    <>
      <div className={styles.modalContent}>{confirmationComponent}</div>
      <div className={styles.modalFooter}>
        <Button
          label="Da"
          className="p-button-info"
          onClick={confirmationDialog}
        />
        <Button label="Nu" className="p-button-danger" onClick={cancel} />
      </div>
    </>
  );
};

export default ConfirmationDialog;
