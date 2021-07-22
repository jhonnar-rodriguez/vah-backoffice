import IBaseTableColumns from "../../../table/IBaseTableColumns";

interface IAllowedClientTableColumns extends IBaseTableColumns {
  id: "name" | "secret" | "provider" | "url" | "notificationUrl" | "revoked" | "actions";
}

export default IAllowedClientTableColumns;
