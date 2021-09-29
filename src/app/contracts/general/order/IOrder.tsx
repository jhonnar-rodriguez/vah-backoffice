import ICustomer from "../../customer/ICustomer";
import IAddress from "../address/IAddress";
import ICart from "../cart/ICart";

interface IOrder {
  _id: string;
  customer: ICustomer;
  cart: ICart;
  status: string;
  shipping: IAddress;
  address: IAddress;
  paymentMethod: string;
  provider: string;
  deliveryDate: string;
  createdAt: string;
  updatedAt: string;
  additional?: any;
}

export default IOrder;
