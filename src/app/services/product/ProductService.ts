import httpClient from "../../../config/axios";
import IProduct from "../../contracts/product/IProduct";
import IProductShow from "../../contracts/product/IProductShow";

class ProductService {
  public static async getAll(): Promise<IProduct[]> {
    const xhr = await httpClient.get('/product').then(({ data }) => data.products);

    return xhr;
  }

  public static async getById(productId: string): Promise<IProductShow> {
    const xhr = await httpClient.get(`product/${productId}`).then(({ data }) => data.product);

    return xhr;
  }

  public static async store(product: IProduct): Promise<IProduct> {
    const xhr = await httpClient.post("product", { ...product }).then(({ data }) => data.product);

    return xhr;
  }

  public static async remove(id: string): Promise<void> {
    await httpClient.delete(`/product/${id}`);
  }
}

export default ProductService;
