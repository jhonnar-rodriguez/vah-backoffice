import httpClient from "../../../config/axios";
import ICustomer from "../../contracts/customer/ICustomer";

class CustomerService {
  public static async getAll(): Promise<ICustomer[]> {
    const xhr = await httpClient.get('/customer').then(({ data }) => data.customers);

    return xhr;
  }
}

export default CustomerService;
