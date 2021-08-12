import ICoupon from "../coupon/ICoupon";
import ICustomer from "../customer/ICustomer";
import IOrderChangeStatus from "../general/order/IOrderChangeStatus";
import IProduct from "../product/IProduct";
import IAllowedClient from "../security/allowedClient/IAllowedClient";
import IUser from "../security/user/IUser";

export type IElementToUpdate = IProduct | ICustomer | ICoupon | IAllowedClient | IOrderChangeStatus | IUser;

interface IFormProps {
  open: boolean,
  action: string,
  handleClose: any,
  elementToUpdate: IElementToUpdate,
}

export default IFormProps;
