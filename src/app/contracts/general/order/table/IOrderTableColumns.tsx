import IBaseTableColumns from "../../../table/IBaseTableColumns";

interface IOrderTableColumns extends IBaseTableColumns {
  id: "customer" | "address" | "createdAt" | "cart" | "status" | "actions",
}

export default IOrderTableColumns;
