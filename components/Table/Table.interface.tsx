import { IStock } from "../../interfaces/Stocks.interface";

export interface ITable {
  items: IStock[];
  columns: IColumn[];
  props?: any;
}

export interface IColumn {
  field?: string;
  header: string;
  props?: any;
}

export interface ILazyParams {
  first: number;
  rows: number;
  page: number;
  filters?: any;
}
