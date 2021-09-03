import ISaleByCustomerTableColumn from "../../../contracts/report/tables/ISaleByCustomerTableColumn";
import { CurrencyHelper } from "../../../helpers";
import moment from "../../../../config/moment";

const columns: ISaleByCustomerTableColumn[] = [
  {
    id: 'order',
    label: '# Pedido',
    minWidth: 170,
    generateLink: true,
  },
  {
    id: 'paymentMethod',
    label: 'Método de Pago',
    minWidth: 100,
  },
  {
    id: 'name',
    label: 'Nombre del cliente',
    minWidth: 170,
  },
  {
    id: 'surname',
    label: 'Apellido del client',
    minWidth: 170,
  },
  {
    id: 'mobile',
    label: 'Teléfono',
    minWidth: 100,
  },
  {
    id: 'createAt',
    label: 'Creada el',
    minWidth: 100,
    format: (value: string) => moment(value).format("LLL"),
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 100,
    format: (value: number) => CurrencyHelper.formatTotal(value),
  },
];

export default columns;
