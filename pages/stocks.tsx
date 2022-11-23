import { useEffect, useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Table from "../components/Table/Table";
import { ILazyParams } from "../components/Table/Table.interface";
import styles from "../styles/Stocks.module.scss";
import Modal from "../components/Modal/Modal";
import AddStock from "../components/AddStock/AddStock";
import SubtractStock from "../components/SubtractStock/SubtractStock";
import EditProduct from "../components/EditProduct/EditProduct";
import AddProduct from "../components/AddProduct/AddProduct";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog";
import DataService from "../services/data.service";
import { IStock } from "../interfaces/Stocks.interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveStock from "../components/RemoveStock/RemoveStock";
import toastOptions from "../utils/toastOptions";
import useWindowDimensions from "../utils/getWindowDimensions";

const Stocks = () => {
  const [stockItems, setStockItems] = useState<IStock[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [modalContent, setModalContent] = useState(<></>);
  const [filters, setFilters] = useState<any>({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });
  const [lazyParams, setLazyParams] = useState<ILazyParams>({
    first: 0,
    rows: 10,
    page: 1,
    filters,
  });

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    loadLazyData();
  }, [lazyParams, filters]);

  const loadLazyData = async () => {
    setLoading(true);
    try {
      const result = await DataService.getStocks(lazyParams, filters);
      setStockItems(result.stocks);
      setTotalRecords(result.totalRecords);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onPage = (event: ILazyParams) => {
    setLazyParams(event);
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilter(value);
  };

  const clearGlobalFilter = () => {
    setFilters({
      global: { value: "", matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilter("");
  };

  const addProduct = () => {
    setModalTitle("Adauga produs");
    setModalContent(
      <AddProduct
        key={"newProduct"}
        setModalVisible={setModalVisible}
        newRow={newRow}
        toast={toast}
      />
    );
    setModalVisible(true);
  };

  const addStock = (rowData: any) => {
    setModalTitle("Adauga in stoc");
    setModalContent(
      <AddStock
        key={rowData.productID}
        setModalVisible={setModalVisible}
        data={rowData}
        toast={toast}
      />
    );
    setModalVisible(true);
  };

  const subtractStock = (rowData: any) => {
    setModalTitle("Scade din stoc");
    setModalContent(
      <SubtractStock
        key={rowData.productID}
        setModalVisible={setModalVisible}
        data={rowData}
        toast={toast}
      />
    );
    setModalVisible(true);
  };

  const editProduct = (rowData: any) => {
    setModalTitle("Modifica produs");
    setModalContent(
      <EditProduct
        key={rowData.productID}
        setModalVisible={setModalVisible}
        data={rowData}
        toast={toast}
      />
    );
    setModalVisible(true);
  };

  const productDelete = async (rowData: any) => {
    try {
      await DataService.deleteProduct(rowData.productID);
      deleteRow(rowData.productID);
      toast.success("Stergere efectuata cu succes !", toastOptions);
    } catch (error) {
      toast.error("Stergerea produsului nu a reusit !", toastOptions);
    }
  };

  const deleteProduct = (rowData: any) => {
    setModalTitle("Sterge produs");
    setModalContent(
      <ConfirmationDialog
        key={rowData.productID}
        setModalVisible={setModalVisible}
        confirmationComponent={<RemoveStock data={rowData} />}
        confirmAction={() => productDelete(rowData)}
        toast={toast}
      />
    );
    setModalVisible(true);
  };

  const newRow = (product: IStock) => {
    let newItems = [product];
    newItems.push(...stockItems);
    setStockItems(newItems);
  };

  const deleteRow = (productID: Number) => {
    const newItems = stockItems.filter(
      (product: IStock) => product.productID !== productID
    );
    setStockItems(newItems);
  };

  const stocksActionButtons = (rowData: any) => {
    return (
      <div className={styles.actionsColumn}>
        <Button
          icon="pi pi-minus"
          className="p-button-rounded p-button-warning"
          aria-label="User"
          tooltip="Scade stoc"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            subtractStock(rowData);
          }}
        />
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-success"
          aria-label="User"
          tooltip="Adauga stoc"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            addStock(rowData);
          }}
        />
        <Button
          icon="pi pi-file-edit"
          className="p-button-rounded p-button-secondary"
          aria-label="User"
          tooltip="Editare"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            editProduct(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          className={`p-button-rounded p-button-danger ${rowData.productID}`}
          aria-label="User"
          tooltip="Stergere"
          tooltipOptions={{ position: "top" }}
          onClick={() => {
            deleteProduct(rowData);
          }}
        />
      </div>
    );
  };

  const TableHeaderAddButton = (props: any) => {
    return (
      <Button
        type="button"
        icon="pi pi-plus"
        label="Adaugare produs"
        className={`p-button-outlined ${
          props.isBreakpoint ? styles.smallBreakpoint : ""
        }`}
        onClick={addProduct}
      />
    );
  };

  const TableHeaderResetButton = (props: any) => {
    return (
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Resetare filtre"
        className={`p-button-outlined ${
          props.isBreakpoint ? styles.smallBreakpoint : "mr-3"
        }`}
        onClick={clearGlobalFilter}
      />
    );
  };

  const TableHeaderGlobalSearch = (props: any) => {
    return (
      <span
        className={`p-input-icon-left ${
          props.isBreakpoint ? styles.smallBreakpoint : ""
        }`}
      >
        <i className="pi pi-search" />
        <InputText
          value={globalFilter}
          onChange={onGlobalFilterChange}
          placeholder="Cautare globala"
          className={`${props.isBreakpoint ? styles.smallBreakpoint : ""}`}
        />
      </span>
    );
  };

  const renderHeader = () => {
    if (width > 716) {
      return (
        <div className="flex justify-content-between">
          <TableHeaderAddButton isBreakpoint={false} />
          <div className="flex">
            <TableHeaderResetButton isBreakpoint={false} />
            <TableHeaderGlobalSearch isBreakpoint={false} />
          </div>
        </div>
      );
    } else {
      const className = "w-max";
      return (
        <div className="flex flex-column">
          <div className="flex align-items-center justify-content-center">
            <TableHeaderAddButton isBreakpoint={true} />
          </div>
          <div className="flex align-items-center justify-content-center mt-2">
            <TableHeaderResetButton isBreakpoint={true} />
          </div>
          <div className="flex align-items-center justify-content-center mt-2">
            <TableHeaderGlobalSearch isBreakpoint={true} />
          </div>
        </div>
      );
    }
  };

  const header = renderHeader();

  const props = {
    loading,
    lazy: true,
    header,
    paginator: true,
    first: lazyParams.first,
    rows: 10,
    totalRecords: totalRecords,
    onPage: onPage,
    filters,
    dataKey: "productID",
    resizableColumns: true,
    columnResizeMode: "fit",
    globalFilterFields: ["productName"],
  };

  const columns = [
    {
      field: "productName",
      header: "Nume produs",
      props: {
        style: { width: "35%" },
        resizeable: false,
      },
    },
    {
      field: "productWeight",
      header: "Gramaj",
      props: {
        style: { width: "30%", textAlign: "center" },
        headerClassName: styles.columnHeaderCenter,
        resizeable: false,
      },
    },
    {
      field: "productQuantity",
      header: "Cantitate",
      props: {
        style: { width: "20%", textAlign: "center" },
        headerClassName: styles.columnHeaderCenter,
        resizeable: false,
      },
    },
    {
      header: "Actiuni",
      props: {
        style: { width: "25%", textAlign: "center" },
        headerClassName: styles.columnHeaderCenter,
        bodyClassName: styles.actionsBody,
        resizeable: false,
        body: stocksActionButtons,
      },
    },
  ];

  return (
    <div className={styles.stocksTable}>
      <ToastContainer />
      <Modal
        visible={modalVisible}
        handleClose={() => {
          setModalVisible(false);
        }}
        title={modalTitle}
        // eslint-disable-next-line react/no-children-prop
        children={modalContent}
      />
      <Table items={stockItems} columns={columns} props={props} />
    </div>
  );
};

export default Stocks;
