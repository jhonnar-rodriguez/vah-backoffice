import httpClient from "../../../../config/axios";
import ISaleByCustomer from "../../../contracts/report/ISaleByCustomer";
import ISaleByProduct from "../../../contracts/report/ISaleByProduct";

class ReportService {
  public static async getSalesByProduct(): Promise<ISaleByProduct[]> {
    const xhr = await httpClient.post('/report/sales/product', { products: [] }).then(({ data }) => data.data);

    return xhr;
  }

  public static async getSalesByCustomer(): Promise<ISaleByCustomer[]> {
    const xhr = await httpClient.post('/report/sales/customer', { customers: [] }).then(({ data }) => data.data);

    return xhr;
  }

  public static async downloadSalesReportByName(reportName: string): Promise<void> {
    await httpClient.post(`/report/sales/${reportName}/generate`).then(({ data }) => data);
  }
}

export default ReportService;
