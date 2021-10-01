import IProcessFilter from "../../contracts/filter/IProcessFilter";
import IReportFilter from "../../contracts/report/filters/IReportFilter";

export const initialFilters: IProcessFilter = {
  page: 1,
  value: '',
  limit: 10,
  filterBy: '',
}

export const reportFiltersInitialState: IReportFilter = {
  filter: '',
  date_end: '',
  date_start: '',
  limit: 10,
  page: 1,
}
