import { DEFAULT_ROWS_PER_PAGE } from "../../../../config/app";
import httpClient from "../../../../config/axios";
import IReportFilter from "../../../contracts/report/filters/IReportFilter";
import ISalesByCustomersPaginated from "../../../contracts/report/tables/ISalesByCustomersPaginated";
import ISalesByProductsPaginated from "../../../contracts/report/tables/ISalesByProductsPaginated";

class ReportService {
  public static async getSalesByProduct(filters?: IReportFilter): Promise<ISalesByProductsPaginated> {
    const { page = 1, limit = DEFAULT_ROWS_PER_PAGE } = filters || {};

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

    const xhr = await httpClient.post(`/report/sales/product?page=${page}&limit=${limit}`, { ...filtersToApply }).then(({ data }) => {
      return {
        salesByProducts: data.data,
        ...data,
      }
    });

    return xhr;
  }

  public static async getSalesByCustomer(filters?: IReportFilter): Promise<ISalesByCustomersPaginated> {
    const { page = 1, limit = DEFAULT_ROWS_PER_PAGE } = filters || {};

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

    const xhr = await httpClient.post(`/report/sales/customer?page=${page}&limit=${limit}`, { ...filtersToApply }).then(({ data }) => {
      return {
        salesByCustomers: data.data,
        ...data,
      };
    });

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
