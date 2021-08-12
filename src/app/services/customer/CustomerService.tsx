import httpClient from "../../../config/axios";
import ICustomer from "../../contracts/customer/ICustomer";

interface ICustomerParamSearch {
  name?: string,
  code?: string,
  email?: string,
  mobile?: string,
  document?: string,
  surname?: string,
}

class CustomerService {
  public static async getAll(q?: string): Promise<ICustomer[]> {

    let params: ICustomerParamSearch = {};

    if (typeof q !== 'undefined' && q?.length > 0) {
      const filter = q.toLowerCase();

      params = {
        name: filter,
        code: filter,
        email: filter,
        mobile: filter,
        document: filter,
        surname: filter,
      }
    }

    const xhr = await httpClient.get('/customer', { params }).then(({ data }) => data.customers);

    return xhr;
  }

  public static async store(customer: ICustomer): Promise<ICustomer> {
    const xhr = await httpClient.post("/customer", { ...customer }).then(({ data }) => data.customer);

    return xhr;
  }

  public static async update(customer: ICustomer): Promise<ICustomer> {
    const xhr = await httpClient.put(`/customer/${customer._id}`, { ...customer }).then(({ data }) => data.customer);

    return xhr;
  }

  public static async remove(customerId: string): Promise<void> {
    await httpClient.delete(`/customer/${customerId}`);
  }
}

export default CustomerService;
