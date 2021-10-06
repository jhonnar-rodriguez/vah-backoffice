import IPromotion from '../../contracts/promotion/IPromotion';

export const promotionInitialState: IPromotion = {
  _id: '',
  rules: '',
  name: '',
  description: '',
};

export const promotionMock: IPromotion[] = [
  {
    _id: '1',
    name: 'Prueba I',
    rules: '[{sku: ASBCD, price: 25.41},{sku: ASCJD, price: 26.22}]',
    description: 'Prueba I',
  },
  {
    _id: '2',
    name: 'Prueba II',
    rules: '[{sku: DCBSA, price: 25.41},{sku: DJCAS, price: 26.22}]',
    description: 'Prueba II',
  },
];
