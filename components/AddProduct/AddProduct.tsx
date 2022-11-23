import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { IAddProduct } from "./AddProduct.interface";
import styles from "./AddProduct.module.scss";
import toastOptions from "../../utils/toastOptions";
import DataService from "../../services/data.service";
import { IStock } from "../../interfaces/Stocks.interface";

const AddProduct = ({ setModalVisible, newRow, toast }: IAddProduct) => {
  const [productName, setProductName] = useState("");
  const [productWeight, setProductWeight] = useState<string | null>("");
  const [measureUnit, setMeasureUnit] = useState("");
  const [productQuantity, setProductQuantity] = useState<string | null>("1");

  const addProduct = async () => {
    try {
      const newProduct: IStock = {
        productName,
        productWeight: Number(parseFloat(productWeight || "")).toFixed(2),
        productQuantity: productQuantity || "",
        measureUnit,
      };

      const res = await DataService.addProduct(newProduct);

      newProduct.productID = res.productID;
      newProduct.productWeight = `${Number(
        parseFloat(productWeight || "")
      ).toFixed(2)} ${measureUnit}`;
      newProduct.productQuantity = Number(productQuantity).toFixed(2);

      newRow(newProduct);
      toast.success("Adaugare efectuata cu succes !", toastOptions);
    } catch (error) {
      toast.error("Adaugarea produsului nu a reusit !", toastOptions);
    }
    setModalVisible(false);
  };
  const cancel = () => {
    setModalVisible(false);
  };

  return (
    <>
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
        <div className="flex mt-5 shadow-3 p-3 border-round-xl">
          <span className={`${styles.productLabel} font-semibold`}>
            Gramaj:
          </span>
          <InputNumber
            value={parseFloat(productWeight || "") || null}
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
            Cantitate:
          </span>
          <InputNumber
            value={parseFloat(productQuantity || "")}
            className={styles.quantityInput}
            onValueChange={(e) =>
              setProductQuantity(Number(e.value).toFixed(2))
            }
            mode="decimal"
            min={0}
            showButtons
            buttonLayout="horizontal"
            decrementButtonClassName="p-button-danger"
            incrementButtonClassName="p-button-success"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            minFractionDigits={2}
            maxFractionDigits={2}
          />
        </div>
      </div>
      <div className={styles.modalFooter}>
        <Button
          label="Salveaza"
          className="p-button-info"
          onClick={addProduct}
        />
        <Button label="Renunta" className="p-button-danger" onClick={cancel} />
      </div>
    </>
  );
};

export default AddProduct;
