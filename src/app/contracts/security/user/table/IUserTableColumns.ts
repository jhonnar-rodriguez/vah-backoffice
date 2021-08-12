import IBaseTableColumns from "../../../table/IBaseTableColumns";

interface IUserTableColumns extends IBaseTableColumns {
  id: "name" | "lastname" | "username" | "role" | "email" | "active" | "actions";
}

export default IUserTableColumns;
