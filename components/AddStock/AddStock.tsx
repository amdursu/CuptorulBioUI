import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import DataService from "../../services/data.service";
import toastOptions from "../../utils/toastOptions";
import { IAddStock } from "./AddStock.interface";
import styles from "./AddStock.module.scss";

const AddStock = ({ setModalVisible, data, toast }: IAddStock) => {
  const [stockValue, setStockValue] = useState<string | null>("0");
  const [priceValue, setPriceValue] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState<string | null>(null);

  useEffect(() => {
    const nQ = Number(
      Number(data.productQuantity) + Number(stockValue)
    ).toFixed(2);
    setNewQuantity(nQ);
  }, [stockValue]);

  const addStock = async () => {
    try {
      await DataService.higherQuantity(
        data.productID || 0,
        stockValue,
        Number(priceValue).toFixed(2)
      );
      data.productQuantity = newQuantity || "";
      toast.success("Modificare efectuata cu succes !", toastOptions);
    } catch (error) {
      toast.error("Modificarea cantitatii nu a reusit !", toastOptions);
    }
    setModalVisible(false);
  };
  const cancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className={styles.modalContent}>
        <div className="grid">
          <div className="col shadow-3 border-round-xl inline p-4 font-bold">
            {data.productName}
          </div>
          <div className="col shadow-3 border-round-xl inline p-4 ml-5">
            <span className="font-semibold">Cantitate curenta: </span>
            <span className="font-italic text-3xl">
              {Number(data.productQuantity).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="grid mt-5 shadow-3 p-4 border-round-xl">
          <InputNumber
            className={`${styles.addStockQuantity}`}
            value={parseFloat(stockValue || "")}
            onValueChange={(e) => setStockValue(Number(e.value).toFixed(2))}
            min={0}
            showButtons
            buttonLayout="horizontal"
            decrementButtonClassName="p-button-danger"
            incrementButtonClassName="p-button-success"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
          />
          <span className="font-semibold ml-8 mt-3">Cantitate noua: </span>
          <span className={`${styles.newQuantity} font-italic ml-2 text-3xl`}>
            {newQuantity}
          </span>
        </div>
        <div className="grid mt-5">
          <div className="col-6 shadow-3 p-3 border-round-xl">
            <span className={`${styles.priceLabel} font-semibold`}>Pret: </span>
            <InputNumber
              value={priceValue}
              className={styles.priceInput}
              onValueChange={(e) => setPriceValue(e.value)}
              mode="currency"
              currency="RON"
              locale="ro-RO"
            />
          </div>
        </div>
      </div>
      <div className={styles.modalFooter}>
        <Button label="Salveaza" className="p-button-info" onClick={addStock} />
        <Button label="Renunta" className="p-button-danger" onClick={cancel} />
      </div>
    </>
  );
};

export default AddStock;
