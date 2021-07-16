import ICategory from "../category/ICategory";

interface IProductShow {
  _id: string,
  name: string,
  summary: string,
  description: string,
  sku: string,
  price: number,
  quantity: number,
  stockStatus: boolean,
  lowStockAlert: boolean,
  urlImage: string,
  urlImageMiniature: string,
  isVirtual: boolean,
  active: boolean,
  discount: number,
  totalDiscount: number,
  category?: ICategory,
}

export default IProductShow;

