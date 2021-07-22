import ICoupon from "../coupon/ICoupon";
import ICustomer from "../customer/ICustomer";
import IProduct from "../product/IProduct";
import IAllowedClient from "../security/allowedClient/IAllowedClient";

export type IElementToUpdate = IProduct | ICustomer | ICoupon | IAllowedClient;

interface IFormProps {
  open: boolean,
  action: string,
  handleClose: any,
  elementToUpdate: IElementToUpdate,
}

export default IFormProps;
