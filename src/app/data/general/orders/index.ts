import { couponInitialState } from './../../coupons/index';
import IOrder from "../../../contracts/general/order/IOrder";

export const orderInitialState: IOrder = {
  _id: "",
  customer: {
    _id: "",
    name: "",
    code: "",
    email: "",
    mobile: "",
    document: "",
    surname: "",
    documentType: {
      name: "",
      value: "",
      pattern: "",
    },
  },
  cart: {
    _id: "",
    total: 0,
    active: false,
    customer: "",
    products: [],
    totalDiscount: 0,
    coupon: couponInitialState,
  },
  status: "",
  shipping: {
    _id: "",
    name: "",
    phone: "",
    surname: "",
    addressName: "",
    description: "",
    addressComplement: "",
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  },
  address: {
    _id: "",
    name: "",
    phone: "",
    surname: "",
    addressName: "",
    description: "",
    addressComplement: "",
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  },
  provider: "",
  paymentMethod: "",
  deliveryDate: "",
  createdAt: "",
  updatedAt: "",
};
