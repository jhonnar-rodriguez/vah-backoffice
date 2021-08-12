import httpClient from "../../../config/axios";
import IProcessFilter from "../../contracts/filter/IProcessFilter";
import IProduct from "../../contracts/product/IProduct";

interface IProductParamSearch {
  sku?: string,
  name?: string,
  price?: number,
  description?: string,
}

class ProductService {
  public static async getAll(filter?: IProcessFilter): Promise<IProduct[]> {
    let params: IProductParamSearch = {};

    if (typeof filter?.value !== 'undefined' && filter.value?.length > 0) {
      const query = filter.filterBy === "price" ? parseFloat(filter.value) : filter.value.toLowerCase();

      params = {
        [filter.filterBy]: query,
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
