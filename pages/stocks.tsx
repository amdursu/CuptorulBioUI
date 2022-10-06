import { SyntheticEvent, useEffect, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Table from "../components/Table/Table";
import { ILazyParams } from "../components/Table/Table.interface";
import styles from "../styles/Stocks.module.scss";

const Stocks = () => {
  const [stockItems, setStockItems] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState<any>({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });
  const [lazyParams, setLazyParams] = useState<ILazyParams>({
    first: 0,
    rows: 6,
    page: 1,
    filters,
  });

  useEffect(() => {
    loadLazyData();
  }, [lazyParams, filters]);

  const loadLazyData = async () => {
    setLoading(true);
    try {
      const fetchStocks: any = await fetch(
        `/api/getStocks?limit=${lazyParams.rows}&offset=${lazyParams.first}&globalFilter=${filters.global.value}`
      );
      const result = await fetchStocks.json();

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

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearGlobalFilter}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  const props = {
    loading,
    lazy: true,
    header,
    paginator: true,
    first: lazyParams.first,
    rows: 6,
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
        style: { width: "40%" },
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
      field: "quantity",
      header: "Cantitate",
      props: {
        style: { width: "30%", textAlign: "center" },
        headerClassName: styles.columnHeaderCenter,
        resizeable: false,
      },
    },
  ];

  return (
    <div className={styles.stocksTable}>
      <Table items={stockItems} columns={columns} props={props} />
    </div>
  );
};

export default Stocks;
