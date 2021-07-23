import ICoupon from "../coupon/ICoupon";
import ICustomer from "../customer/ICustomer";
import IOrderChangeStatus from "../general/order/IOrderChangeStatus";
import IProduct from "../product/IProduct";
import IAllowedClient from "../security/allowedClient/IAllowedClient";

export type IElementToUpdate = IProduct | ICustomer | ICoupon | IAllowedClient | IOrderChangeStatus;

interface IFormProps {
  open: boolean,
  action: string,
  handleClose: any,
  elementToUpdate: IElementToUpdate,
}

export default IFormProps;
