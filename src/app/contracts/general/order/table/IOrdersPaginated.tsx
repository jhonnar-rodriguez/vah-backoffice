import IOrder from "../IOrder";
import IPagination from "../../../table/IPagination";

interface IOrdersPaginated extends IPagination {
  orders: IOrder[];
}

export default IOrdersPaginated;
