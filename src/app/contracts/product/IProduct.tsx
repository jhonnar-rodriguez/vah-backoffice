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
  category: string,
  stockStatus: boolean,
  totalDiscount: number,
  description?: string,
}

export default IProduct;
