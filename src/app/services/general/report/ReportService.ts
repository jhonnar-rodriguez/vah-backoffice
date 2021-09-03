import httpClient from "../../../../config/axios";
import ISaleByProduct from "../../../contracts/report/ISaleByProduct";

class ReportService {
  public static async getSalesByProduct(): Promise<ISaleByProduct[]> {
    const xhr = await httpClient.post('/report/sales/product', { products: [] }).then(({ data }) => data.data);

    return xhr;
  }

  public static async downloadSalesByProductReport(): Promise<void> {
    await httpClient.post('/report/sales/product/generate').then(({ data }) => data);
  }
}

export default ReportService;
