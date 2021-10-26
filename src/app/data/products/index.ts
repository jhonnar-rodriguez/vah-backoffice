import { v4 as uuid } from 'uuid';
import IFilter from '../../contracts/filter/IFilter';
import IProduct from '../../contracts/product/IProduct';

export const productInitialState: IProduct = {
  _id: '',
  name: '',
  category: {
    _id: ' ',
    name: '',
    slug: '',
  },
  sku: '',
  summary: '',
  description: '',
  urlImage: '',
  price: 1,
  quantity: 1,
  image: '',
  discount: 0,
  stockStatus: true,
  position: 0,
  totalDiscount: 0,
  rules: '{"promotions":[],"discounts":[]}',
};

export const productsFilterableOptions: IFilter[] = [
  {
    id: uuid(),
    value: 'name',
    label: 'Nombre',
  },
  {
    id: uuid(),
    value: 'sku',
    label: 'SKU',
  },
  {
    id: uuid(),
    value: 'description',
    label: 'Descripción',
  },
  {
    id: uuid(),
    value: 'price',
    label: 'Precio',
  },
];
