import ICoupon from "../../coupon/ICoupon";

export interface IProductInCart {
  productId: string,
  name: string,
  description: string,
  urlImage: string,
  price: number,
  discount: number,
  quantity: number,
  total: number,
};

interface ICart {
  _id: string,
  total: number,
  active: boolean,
  customer: string,
  products: IProductInCart[],
  totalDiscount: number,
  coupon?: ICoupon,
};

export default ICart;
