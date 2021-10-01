import IPagination from "../../table/IPagination";
import ISaleByProduct from "../ISaleByProduct";

interface ISalesByProductsPaginated extends IPagination {
  salesByProducts: ISaleByProduct[],
}

export default ISalesByProductsPaginated;
