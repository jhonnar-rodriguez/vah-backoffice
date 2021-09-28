import IPromotion from '../../contracts/promotion/IPromotion';

export const promotionInitialState: IPromotion = {
  _id: '',
  sku: '',
  value: 0,
  segment: '',
  description: '',
};

export const promotionMock: IPromotion[] = [
  {
    _id: '1',
    sku: 'ABCDE',
    value: 10.590,
    segment: 'Prueba I',
    description: 'Prueba I',
  },
  {
    _id: '2',
    sku: 'FGHIJ',
    value: 20.2,
    segment: 'Prueba II',
    description: 'Prueba II',
  },
  {
    _id: '3',
    sku: 'KLMNÑ',
    value: 3.99,
    segment: 'Prueba III',
    description: 'Prueba III',
  },
  {
    _id: '4',
    sku: 'OPQRS',
    value: 4.99,
    segment: 'Prueba IV',
    description: 'Prueba IV',
  },
];
