import { DEFAULT_ROWS_PER_PAGE } from "../../../config/app";
import httpClient from "../../../config/axios";
import ICustomer from "../../contracts/customer/ICustomer";
import ICustomersPaginated from "../../contracts/customer/table/ICustomersPaginated";
import IBaseFilter from "../../contracts/filter/IBaseFilter";
import IProcessFilter from "../../contracts/filter/IProcessFilter";

interface ICustomerParamSearch extends IBaseFilter {
  name?: string;
  code?: string;
  email?: string;
  mobile?: string;
  document?: string;
  surname?: string;
}

class CustomerService {
  public static async getAll(
    filter?: IProcessFilter
  ): Promise<ICustomersPaginated> {
    const { page = 1, limit = DEFAULT_ROWS_PER_PAGE } = filter || {};
    let params: ICustomerParamSearch = { page, limit };

    if (typeof filter?.value !== "undefined" && filter.value?.length > 0) {
      const query = filter.value.toLowerCase();

      params = {
        ...params,
        [filter.filterBy]: query,
      };
    }

    const xhr = await httpClient
      .get("/customer", { params })
      .then(({ data }) => {
        return {
          customers: data.customers,
          ...data,
        };
      });

    return xhr;
  }

  public static async downloadAll(filter?: IProcessFilter): Promise<void> {
    const { page = 1, limit = DEFAULT_ROWS_PER_PAGE } = filter || {};
    let params: ICustomerParamSearch = { page, limit };

    if (typeof filter?.value !== "undefined" && filter.value?.length > 0) {
      const query = filter.value.toLowerCase();

      params = {
        ...params,
        [filter.filterBy]: query,
      };
    }
    await httpClient.post("/customer/export", { params }).then(({ data }) => data);
  }

  public static async store(customer: ICustomer): Promise<ICustomer> {
    const xhr = await httpClient
      .post("/customer", { ...customer })
      .then(({ data }) => data.customer);

    return xhr;
  }

  public static async update(customer: ICustomer): Promise<ICustomer> {
    const xhr = await httpClient
      .put(`/customer/${customer._id}`, { ...customer })
      .then(({ data }) => data.customer);

    return xhr;
  }

  public static async remove(customerId: string): Promise<void> {
    await httpClient.delete(`/customer/${customerId}`);
  }
}

export default CustomerService;
