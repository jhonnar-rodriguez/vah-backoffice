import IPagination from "../../../table/IPagination";
import IAllowedClient from "../IAllowedClient";

interface IAllowedClientsPaginated extends IPagination {
  clients: IAllowedClient[],
}

export default IAllowedClientsPaginated;
