import httpClient from "../../../../config/axios";
import IOrder from "../../../contracts/general/order/IOrder";
import IOrderChangeStatus from "../../../contracts/general/order/IOrderChangeStatus";
import IBaseFilter from "../../../contracts/filter/IBaseFilter";
import { DEFAULT_ROWS_PER_PAGE } from "../../../../config/app";

class OrderService {
  public static async getAll(filters?: IBaseFilter): Promise<IOrder[]> {
    const { page = 1, limit = DEFAULT_ROWS_PER_PAGE } = filters || {};
    const xhr = await httpClient.get(`/order?page=${page}&limit=${limit}`).then(({ data }) => data.orders);

    return xhr;
  }

  public static async store(order: IOrder): Promise<IOrder> {
    const xhr = await httpClient.post("/order", { ...order }).then(({ data }) => data.order);

    return xhr;
  }

  public static async update(order: IOrderChangeStatus): Promise<IOrder> {
    const xhr = await httpClient.put(`/order/${order._id}`, { ...order }).then(({ data }) => data.order);

    return xhr;
  }

  public static async getById(orderId: string): Promise<IOrder> {
    const xhr = await httpClient.get(`/order/${orderId}`).then(({ data }) => data.order);

    return xhr;
  }
}

export default OrderService;
