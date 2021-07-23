import httpClient from "../../../../config/axios";
import IOrder from "../../../contracts/general/order/IOrder";

class OrderService {
  public static async getAll(): Promise<IOrder[]> {
    const xhr = await httpClient.get('/order').then(({ data }) => data.orders);

    return xhr;
  }

  public static async store(order: IOrder): Promise<IOrder> {
    const xhr = await httpClient.post("/order", { ...order }).then(({ data }) => data.order);

    return xhr;
  }

  public static async update(order: IOrder): Promise<IOrder> {
    const xhr = await httpClient.put(`/order/${order._id}`, { ...order }).then(({ data }) => data.order);

    return xhr;
  }

  public static async getById(orderId: string): Promise<IOrder> {
    const xhr = await httpClient.get(`/order/${orderId}`).then(({ data }) => data.order);

    return xhr;
  }
}

export default OrderService;
