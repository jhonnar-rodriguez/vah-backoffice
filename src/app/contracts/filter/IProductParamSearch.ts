import IBaseFilter from "./IBaseFilter";

interface IProductParamSearch extends IBaseFilter {
  sku?: string,
  name?: string,
  price?: number,
  description?: string,
}

export default IProductParamSearch;
