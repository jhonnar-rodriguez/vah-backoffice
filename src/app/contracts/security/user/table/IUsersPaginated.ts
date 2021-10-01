import IUser from "../IUser";
import IPagination from "../../../table/IPagination";

interface IUsersPaginated extends IPagination {
  users: IUser[],
}

export default IUsersPaginated;
