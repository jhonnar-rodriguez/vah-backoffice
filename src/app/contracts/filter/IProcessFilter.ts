import IBaseFilter from "./IBaseFilter";

interface IProcessFilter extends IBaseFilter {
  filterBy: string,
  value: string,
};

export default IProcessFilter;
