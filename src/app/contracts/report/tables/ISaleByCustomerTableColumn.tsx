import IBaseTableColumns from "../../table/IBaseTableColumns";

interface ISaleByCustomerTableColumn extends IBaseTableColumns {
  id: "order" | "paymentMethod" | "name" | "surname" | "mobile" | "createAt" | "total";
}

export default ISaleByCustomerTableColumn;
