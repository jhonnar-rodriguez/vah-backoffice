import IBaseTableColumns from "../../table/IBaseTableColumns";

interface ICustomerColumns extends IBaseTableColumns {
  id: "name" | "surname" | "email" | "documentType" | "document" | "actions";
}

export default ICustomerColumns;
