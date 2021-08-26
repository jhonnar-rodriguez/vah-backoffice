import IBaseTableColumns from "../../table/IBaseTableColumns";

interface ICustomerColumns extends IBaseTableColumns {
  id: "name" | "surname" | "email" | "documentType" | "document" | "mobile" | "actions";
}

export default ICustomerColumns;
