import { v4 as uuid } from 'uuid';
import { couponInitialState } from './../../coupons/index';
import IOrder from "../../../contracts/general/order/IOrder";
import IOrderChangeStatus from '../../../contracts/general/order/IOrderChangeStatus';
import IOrderAvailableStatus from '../../../contracts/general/order/IOrderAvailableStatus';

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

export const orderStatusInitialState: IOrderChangeStatus = {
  _id: "",
  status: " ",
  description: "",
}

export const orderAvailableStatuses: IOrderAvailableStatus[] = [
  {
    id: uuid(),
    label: "Exitoso",
    value: "success",
  },
  {
    id: uuid(),
    label: "Facturado",
    value: "invoiced",
  },
  {
    id: uuid(),
    label: "Pendiente",
    value: "pending",
  },
  {
    id: uuid(),
    label: "Cancelado",
    value: "cancelled",
  },
  {
    id: uuid(),
    label: "Rechazado",
    value: "rejected",
  },
];
