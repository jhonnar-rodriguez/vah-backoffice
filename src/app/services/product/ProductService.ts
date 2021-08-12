import httpClient from "../../../config/axios";
import IProduct from "../../contracts/product/IProduct";

interface IProductParamSearch {
  sku?: string,
  name?: string,
  price?: number,
  description?: string,
}

class ProductService {
  public static async getAll(q?: string): Promise<IProduct[]> {

    let params: IProductParamSearch = {};

    if (typeof q !== 'undefined' && q?.length > 0) {
      const priceFilter = parseInt(q);
      const filter = q.toLowerCase();

      params = {
        name: filter,
        sku: filter,
        price: priceFilter,
        description: filter,
      }

      if (isNaN(priceFilter)) {
        delete params.price;
      }
    }

    const xhr = await httpClient.get('/product', { params }).then(({ data }) => data.products);

    return xhr;
  }

  public static async getById(productId: string): Promise<IProduct> {
    const xhr = await httpClient.get(`product/${productId}`).then(({ data }) => data.product);

    return xhr;
  }

  public static async store(product: IProduct): Promise<IProduct> {
    const xhr = await httpClient.post("product", { ...product }).then(({ data }) => data.product);

    return xhr;
  }

  public static async update(product: IProduct): Promise<IProduct> {
    const xhr = await httpClient.put(`product/${product._id}`, { ...product }).then(({ data }) => data.product);

    return xhr;
  }

  public static async remove(id: string): Promise<void> {
    await httpClient.delete(`/product/${id}`);
  }
}

export default ProductService;
