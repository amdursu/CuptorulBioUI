import { IRemoveStock } from "./RemoveStock.interface";
import styles from "./AddStock.module.scss";

const RemoveStock = ({ data }: IRemoveStock) => {
  return (
    <div>
      <span>Confirmati stergerea produsului </span>
      <span className="text-3xl font-semibold font-italic">
        {data.productName}{" "}
      </span>
      <span>?</span>
    </div>
  );
};

export default RemoveStock;
