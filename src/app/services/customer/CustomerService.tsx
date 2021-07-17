import httpClient from "../../../config/axios";
import ICustomer from "../../contracts/customer/ICustomer";

class CustomerService {
  public static async getAll(): Promise<ICustomer[]> {
    const xhr = await httpClient.get('/customer').then(({ data }) => data.customers);

    return xhr;
  }

  public static async store(customer: ICustomer): Promise<ICustomer> {
    const xhr = await httpClient.post("/customer", { ...customer }).then(({ data }) => data.customer);

    return xhr;
  }

  public static async remove(customerId: string): Promise<void> {
    await httpClient.delete(`/customer/${customerId}`);
  }
}

export default CustomerService;
