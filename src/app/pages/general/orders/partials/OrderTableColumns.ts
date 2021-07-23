import moment from "../../../../../config/moment";
import ICustomer from "../../../../contracts/customer/ICustomer";
import IAddress from "../../../../contracts/general/address/IAddress";
import ICart from "../../../../contracts/general/cart/ICart";
import IOrderTableColumns from "../../../../contracts/general/order/table/IOrderTableColumns";
import { CurrencyHelper, GeneralHelper } from "../../../../helpers";

const OrderTableColumns: IOrderTableColumns[] = [
  {
    id: 'customer',
    label: 'Client',
    minWidth: 170,
    format: (value: ICustomer) => `${value.name} ${value.surname}`,
  },
  {
    id: 'address',
    label: 'Dirección de Entrega',
    minWidth: 100,
    format: (value: IAddress) => GeneralHelper.strLimit(value.addressName),
  },
  {
    id: 'createdAt',
    label: 'Creada El',
    minWidth: 170,
    format: (value: string) => moment(value).format("LL"),
  },
  {
    id: 'cart',
    label: 'Total',
    minWidth: 170,
    format: (value: ICart) => CurrencyHelper.formatTotal(value.total),
  },
  {
    id: 'status',
    label: 'Estado',
    minWidth: 170,
    format: (value: string) => GeneralHelper.getStatusInSpanish(value),
  },
];

export default OrderTableColumns;
