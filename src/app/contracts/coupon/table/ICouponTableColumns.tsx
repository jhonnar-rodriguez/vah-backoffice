import IBaseTableColumns from "../../table/IBaseTableColumns";

interface ICouponTableColumns extends IBaseTableColumns {
  id: "code" | "limit" | "endDate" | "isFirst" | "startDate" | "description" | "actions";
}

export default ICouponTableColumns;
