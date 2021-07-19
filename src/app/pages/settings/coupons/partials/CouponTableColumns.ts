import moment from "../../../../../config/moment";
import ICouponTableColumns from "../../../../contracts/coupon/table/ICouponTableColumns";
import { GeneralHelper } from "../../../../helpers";

const CouponTableColumns: ICouponTableColumns[] = [
  {
    id: 'code',
    label: 'Código',
    minWidth: 170,
    generateLink: true,
  },
  {
    id: 'limit',
    label: 'Límite de Uso',
    minWidth: 100,
  },
  {
    id: 'startDate',
    label: 'Fecha de Inicio',
    minWidth: 170,
    format: (value: string) => moment(value).format("LL"),
  },
  {
    id: 'endDate',
    label: 'Fecha de Finalización',
    minWidth: 170,
    format: (value: string) => moment(value).format("LL"),
  },
  {
    id: 'description',
    label: 'Descripción',
    minWidth: 170,
    format: (value: string) => GeneralHelper.strLimit(value),
  },
  {
    id: 'isFirst',
    label: '¿Es Primero?',
    minWidth: 170,
    format: (value: boolean) => value ? "Si" : "No",
  },
  {
    id: 'actions',
    label: 'Acciones',
    minWidth: 50,
  },
];

export default CouponTableColumns;
