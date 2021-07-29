import ICategory from "../../../contracts/category/ICategory";
import IColumn from "../../../contracts/product/table/IColumn";
import { CurrencyHelper, GeneralHelper } from "../../../helpers";

const columns: IColumn[] = [
  {
    id: 'name',
    label: 'Nombre',
    minWidth: 170,
    generateLink: true,
  },
  {
    id: 'sku',
    label: 'SKU',
    minWidth: 100,
  },
  {
    id: 'summary',
    label: 'Descripción',
    minWidth: 170,
    format: (value: string) => GeneralHelper.strLimit(value),
  },
  {
    id: 'price',
    label: 'Precio',
    minWidth: 100,
    format: (value: number) => CurrencyHelper.formatTotal(value),
  },
  {
    id: 'category',
    label: 'Categoría',
    minWidth: 170,
    format: (value: ICategory) => value !== null && value.hasOwnProperty("name") ? GeneralHelper.strLimit(value.name) : "S/I",
  },
  {
    id: 'stockStatus',
    label: 'Stock',
    minWidth: 170,
    format: (value: boolean) => value === true ? 'Si' : 'No',
  },
  {
    id: 'actions',
    label: 'Acciones',
    minWidth: 50,
  },
];

export default columns;
