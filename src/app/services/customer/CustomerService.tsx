import httpClient from "../../../config/axios";
import ICustomer from "../../contracts/customer/ICustomer";
import IProcessFilter from "../../contracts/filter/IProcessFilter";

interface ICustomerParamSearch {
  name?: string,
  code?: string,
  email?: string,
  mobile?: string,
  document?: string,
  surname?: string,
}

class CustomerService {
  public static async getAll(filter?: IProcessFilter): Promise<ICustomer[]> {

    let params: ICustomerParamSearch = {};

    if (typeof filter?.value !== 'undefined' && filter.value?.length > 0) {
      const query = filter.value.toLowerCase();

      params = {
        [filter.filterBy]: query,
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
