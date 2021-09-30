import IPromotion from '../../contracts/promotion/IPromotion';

export const promotionInitialState: IPromotion = {
  _id: '',
  details: '',
  segment: '',
  description: '',
};

export const promotionMock: IPromotion[] = [
  {
    _id: '1',
    segment: 'Prueba I',
    details: '[{sku: ASBCD, price: 25.41},{sku: ASCJD, price: 26.22}]',
    description: 'Prueba I',
  },
  {
    _id: '2',
    segment: 'Prueba II',
    details: '[{sku: DCBSA, price: 25.41},{sku: DJCAS, price: 26.22}]',
    description: 'Prueba II',
  },
];
