import { ITable } from "./Table.interface";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import shortid from "shortid";
import styles from "./Table.module.scss";

const Table = ({ items, columns, props }: ITable) => {
  return (
    <div>
      <div className={styles.container}>
        <DataTable
          value={items}
          responsiveLayout="scroll"
          showGridlines
          {...props}
        >
          {columns.map((column) => {
            return (
              <Column
                key={shortid.generate()}
                field={column.field}
                header={column.header}
                {...column.props}
              ></Column>
            );
          })}
        </DataTable>
      </div>
    </div>
  );
};

export default Table;
