import IBaseTableColumns from "../../../table/IBaseTableColumns";

interface IOrderTableColumns extends IBaseTableColumns {
  id: "customer" | "address" | "createdAt" | "cart" | "status";
}

export default IOrderTableColumns;
