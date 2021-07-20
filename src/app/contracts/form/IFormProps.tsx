import ICoupon from "../coupon/ICoupon";
import ICustomer from "../customer/ICustomer";
import IProduct from "../product/IProduct";

export type IElementToUpdate = IProduct | ICustomer | ICoupon;

interface IFormProps {
  open: boolean,
  action: string,
  handleClose: any,
  elementToUpdate: IElementToUpdate,
}

export default IFormProps;
