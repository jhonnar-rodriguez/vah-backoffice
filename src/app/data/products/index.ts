import IProduct from "../../contracts/product/IProduct";

export const productInitialState: IProduct = {
  _id: "",
  name: "",
  category: {
    _id: " ",
    name: "",
    slug: "",
  },
  sku: "",
  summary: "",
  description: "",
  urlImage: "",
  price: 1,
  quantity: 1,
  image: "",
  discount: 0,
  stockStatus: true,
  totalDiscount: 0,
};
