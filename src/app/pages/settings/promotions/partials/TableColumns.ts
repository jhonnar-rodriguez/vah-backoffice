import { GeneralHelper } from "../../../../helpers";
import IPromotionTableColumns from "../../../../contracts/promotion/table/IPromotionTableColumns";

const columns: IPromotionTableColumns[] = [
  {
    id: 'name',
    label: 'Segmento',
    minWidth: 170,
    generateLink: true,
    format: (value: string) => GeneralHelper.strLimit(value),
  },
  {
    id: 'rules',
    label: 'Reglas',
    minWidth: 100,
    format: (value: any) => GeneralHelper.formatPromotionDetail(value),
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
