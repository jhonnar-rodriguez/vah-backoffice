import IBaseFilter from "../../filter/IBaseFilter";

interface IReportFilter extends IBaseFilter {
  filter: string,
  date_end: string | null,
  date_start: string | null,
  mobiles?: string[],
  products?: string[],
}

export default IReportFilter;
