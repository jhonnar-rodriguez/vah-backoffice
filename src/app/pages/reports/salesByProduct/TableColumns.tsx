import ISaleByProductTableColumn from "../../../contracts/report/tables/ISaleByProductTable";
import { CurrencyHelper } from "../../../helpers";

const columns: ISaleByProductTableColumn[] = [
  {
    id: 'order',
    label: '# Pedido',
    minWidth: 170,
    generateLink: true,
  },
  {
    id: 'paymentMethod',
    label: 'Método pago',
    minWidth: 100,
  },
  {
    id: 'name',
    label: 'Nombre producto',
    minWidth: 170,
  },
  {
    id: 'price',
    label: 'Precio producto',
    minWidth: 170,
    format: (value: number) => CurrencyHelper.formatTotal(value),
  },
  {
    id: 'discount',
    label: 'Descuento',
    minWidth: 100,
    format: (value: number) => CurrencyHelper.formatTotal(value),
  },
  {
    id: 'quantity',
    label: 'Cantidad',
    minWidth: 100,
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 100,
    format: (value: number) => CurrencyHelper.formatTotal(value),
  },
];

export default columns;
