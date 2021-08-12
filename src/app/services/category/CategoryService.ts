import httpClient from '../../../config/axios';
import ICategory from "../../contracts/category/ICategory";

class CategoryService {
  public static async get(): Promise<ICategory[]> {
    const xhr = await httpClient.get(`/category`).then(({ data }) => data.categories);

    return xhr;
  }
}

export default CategoryService;
