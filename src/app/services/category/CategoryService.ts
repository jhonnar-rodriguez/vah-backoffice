import axios from 'axios';
import ICategory from "../../contracts/category/ICategory";

class CategoryService {
  public static async get(): Promise<ICategory[]> {
    const xhr = await axios.get(`${process.env.REACT_APP_BACKEND}/category`)
      .then(({ data }) => data.categories);

    return xhr;
  }
}

export default CategoryService;
