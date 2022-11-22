import { ILazyParams } from "../components/Table/Table.interface";
import { IStock } from "../interfaces/Stocks.interface";

const headers = {
  "Content-Type": "application/json",
};

const DataService = {
  getStocks: async (lazyParams: ILazyParams, filters: any) => {
    const request: any = await fetch(
      `/api/getStocks?limit=${lazyParams.rows}&offset=${lazyParams.first}&globalFilter=${filters.global.value}`
    );
    const result = await request.json();
    return result;
  },
  higherQuantity: async (
    productID: Number,
    quantity: string | null,
    price: string | null
  ) => {
    const request: any = await fetch(
      `/api/higherQuantity?productID=${productID}&quantity=${quantity}&price=${price}`,
      { method: "PATCH" }
    );
    const result = await request.json();
    return result;
  },
  lowerQuantity: async (productID: Number, quantity: string | null) => {
    const request: any = await fetch(
      `/api/lowerQuantity?productID=${productID}&quantity=${quantity}`,
      { method: "PATCH" }
    );
    const result = await request.json();
    return result;
  },
  updateProduct: async (stock: IStock) => {
    const request: any = await fetch(`/api/updateProduct`, {
      method: "PUT",
      body: JSON.stringify(stock),
      headers,
    });
    const result = await request.json();
    return result;
  },
  addProduct: async (stock: IStock) => {
    const request: any = await fetch(`/api/insertProduct`, {
      method: "POST",
      body: JSON.stringify(stock),
      headers,
    });
    const result = await request.json();
    return result;
  },
  deleteProduct: async (productID: Number) => {
    const request: any = await fetch(
      `/api/deleteProduct?productID=${productID}`,
      {
        method: "DELETE",
      }
    );
    const result = await request.json();
    return result;
  },
};

export default DataService;
