import IPagination from "../../table/IPagination";
import ISaleByCustomer from "../ISaleByCustomer";

interface ISalesByCustomersPaginated extends IPagination {
  salesByCustomers: ISaleByCustomer[],
}

export default ISalesByCustomersPaginated;
