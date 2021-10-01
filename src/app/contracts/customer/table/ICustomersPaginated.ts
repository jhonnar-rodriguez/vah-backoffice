import IPagination from "../../table/IPagination";
import ICustomer from "../ICustomer";

interface ICustomersPaginated extends IPagination {
  customers: ICustomer[],
}

export default ICustomersPaginated;
