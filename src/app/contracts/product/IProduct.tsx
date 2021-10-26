import ICategory from "../category/ICategory";

interface IProduct {
  _id: string,
  sku: string,
  name: string,
  price: number,
  image: string,
  summary: string,
  discount: number,
  quantity: number,
  urlImage: string,
  category: ICategory,
  stockStatus: boolean,
  totalDiscount: number,
  description?: string,
  rules?: string,
  position?: number,
}

export default IProduct;
