import IProduct from "../IProduct";
import IPagination from "../../table/IPagination";

interface IProductsPaginated extends IPagination {
  products: IProduct[],
}

export default IProductsPaginated;
