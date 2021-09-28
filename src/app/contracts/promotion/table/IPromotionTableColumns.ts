import IBaseTableColumns from "../../table/IBaseTableColumns";

interface IPromotionTableColumns extends IBaseTableColumns {
  id: "segment" | "sku" | "value" | "description" | "actions";
}

export default IPromotionTableColumns;
