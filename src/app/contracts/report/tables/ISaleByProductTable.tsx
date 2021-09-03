import IBaseTableColumns from "../../table/IBaseTableColumns";

interface ISaleByProductTableColumn extends IBaseTableColumns {
  id: "order" | "paymentMethod" | "id" | "name" | "price" | "discount" | "quantity" | "total";
}

export default ISaleByProductTableColumn;
