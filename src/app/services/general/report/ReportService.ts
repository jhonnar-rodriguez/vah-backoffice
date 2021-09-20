import httpClient from "../../../../config/axios";
import IReportFilter from "../../../contracts/report/filters/IReportFilter";
import ISaleByCustomer from "../../../contracts/report/ISaleByCustomer";
import ISaleByProduct from "../../../contracts/report/ISaleByProduct";

class ReportService {
  public static async getSalesByProduct(filters?: IReportFilter): Promise<ISaleByProduct[]> {
    let filtersToApply: any = {
      products: [],
    };

    if (typeof filters !== 'undefined') {
      if (typeof filters.products !== 'undefined' && filters.products.length) {
        filtersToApply = {
          ...filtersToApply,
          products: filters.products,
        }
      }

      filtersToApply = this.addDateRangeToFilters(filters, filtersToApply);
    }

    const xhr = await httpClient.post('/report/sales/product', { ...filtersToApply }).then(({ data }) => data.data);

    return xhr;
  }

  public static async getSalesByCustomer(filters?: IReportFilter): Promise<ISaleByCustomer[]> {
    let filtersToApply: any = {
      customers: [],
    };

    if (typeof filters !== 'undefined') {
      if (typeof filters.mobiles !== 'undefined' && filters.mobiles.length) {
        filtersToApply = {
          ...filtersToApply,
          customers: filters.mobiles,
        }
      }

      filtersToApply = this.addDateRangeToFilters(filters, filtersToApply);
    }

    const xhr = await httpClient.post('/report/sales/customer', { ...filtersToApply }).then(({ data }) => data.data);

    return xhr;
  }

  public static async downloadSalesReportByName(reportName: string): Promise<void> {
    await httpClient.post(`/report/sales/${reportName}/generate`).then(({ data }) => data);
  }

  private static addDateRangeToFilters(filters: IReportFilter, previousFilters: any): any {
    if (filters.date_start !== null && filters.date_start.length) {
      previousFilters = {
        ...previousFilters,
        date_start: filters.date_start,
        date_end: filters.date_end,
      }
    }

    return previousFilters;
  }
}

export default ReportService;
