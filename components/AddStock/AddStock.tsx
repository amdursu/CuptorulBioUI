import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import DataService from "../../services/data.service";
import useWindowDimensions from "../../utils/getWindowDimensions";
import toastOptions from "../../utils/toastOptions";
import { IAddStock } from "./AddStock.interface";
import styles from "./AddStock.module.scss";

const AddStock = ({ setModalVisible, data, toast }: IAddStock) => {
  const [stockValue, setStockValue] = useState<string | null>("0");
  const [priceValue, setPriceValue] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState<string | null>(null);

  const { height, width } = useWindowDimensions();

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
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className="flex flex-row">
          <div className="flex w-6 justify-content-center align-content-center shadow-3 border-round-xl inline p-4 font-bold">
            {data.productName}
          </div>
          <div className="flex w-6 justify-content-center align-content-center shadow-3 border-round-xl inline p-4 ml-5">
            <span className="font-semibold w-16rem">Cantitate curenta: </span>
            <span className="font-italic text-3xl ml-2">
              {Number(data.productQuantity).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="mt-5 shadow-3 p-4 border-round-xl w-full">
          <div className={width > 715 ? "flex flex-row" : "flex flex-column"}>
            <InputNumber
              className={`${styles.addStockQuantity} flex`}
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

            <span
              className={`${styles.newQuantity} flex justify-content-center align-content-center font-semibold mt-3`}
            >
              Cantitate noua:{" "}
              <span className={`flex font-normal font-italic ml-2 text-3xl`}>
                {newQuantity}
              </span>
            </span>
          </div>
        </div>
        <div className="mt-5">
          <div
            className={`${styles.priceContainer} shadow-3 p-3 border-round-xl`}
          >
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
    </div>
  );
};

export default AddStock;
