import IPromotionTableColumns from "../../../../contracts/promotion/table/IPromotionTableColumns";
import { CurrencyHelper, GeneralHelper } from "../../../../helpers";

const columns: IPromotionTableColumns[] = [
  {
    id: 'segment',
    label: 'Segmento',
    minWidth: 170,
    generateLink: true,
    format: (value: string) => GeneralHelper.strLimit(value),
  },
  {
    id: 'sku',
    label: 'SKU',
    minWidth: 100,
  },
  {
    id: 'value',
    label: 'Precio',
    minWidth: 100,
    format: (value: number) => CurrencyHelper.formatTotal(value),
  },
  {
    id: 'description',
    label: 'Descripción',
    minWidth: 170,
    format: (value: string) => GeneralHelper.strLimit(value),
  },
  {
    id: 'actions',
    label: 'Acciones',
    minWidth: 50,
  },
];

export default columns;
