import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { IEditProduct } from "./EditProduct.interface";
import styles from "./EditProduct.module.scss";
import DataService from "../../services/data.service";
import toastOptions from "../../utils/toastOptions";

const EditProduct = ({ setModalVisible, data, toast }: IEditProduct) => {
  const [productName, setProductName] = useState(data.productName);
  const [productWeight, setProductWeight] = useState<string | null>(
    data.productWeight
  );
  const [measureUnit, setMeasureUnit] = useState(
    data.productWeight.split(" ")[1]
  );

  const editProduct = async () => {
    try {
      data.productName = productName;
      data.productWeight = Number(parseFloat(productWeight || "")).toFixed(2);
      data.measureUnit = measureUnit;
      await DataService.updateProduct(data);
      data.productWeight = `${Number(parseFloat(productWeight || "")).toFixed(
        2
      )} ${measureUnit}`;
      toast.success("Modificare efectuata cu succes !", toastOptions);
    } catch (error) {
      toast.error("Modificarea produsului nu a reusit !", toastOptions);
    }

    setModalVisible(false);
  };
  const cancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div className={styles.modalContent}>
        <div
          className={`${styles.inputCard} flex shadow-3 p-3 border-round-xl`}
        >
          <span className={`${styles.productLabel} font-semibold`}>
            Nume produs:
          </span>
          <InputText
            value={productName}
            className={styles.productInput}
            keyfilter={/^[\w\-\s]+$/}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="flex mt-5 shadow-3 p-3 border-round-xl">
          <span className={`${styles.productLabel} font-semibold`}>
            Gramaj:
          </span>
          <InputNumber
            value={parseFloat(productWeight || "")}
            className={styles.productInput}
            onValueChange={(e) => setProductWeight(Number(e.value).toFixed(2))}
            mode="decimal"
            minFractionDigits={2}
            maxFractionDigits={2}
          />
        </div>
        <div
          className={`${styles.inputCard} flex mt-5 shadow-3 p-3 border-round-xl`}
        >
          <span className={`${styles.productLabel} font-semibold`}>
            Unitate masura:
          </span>
          <InputText
            value={measureUnit}
            className={styles.productInput}
            keyfilter="alpha"
            onChange={(e) => setMeasureUnit(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.modalFooter}>
        <Button
          label="Salveaza"
          className="p-button-info"
          onClick={editProduct}
        />
        <Button label="Renunta" className="p-button-danger" onClick={cancel} />
      </div>
    </div>
  );
};

export default EditProduct;
