import IBaseFilter from "./IBaseFilter";

interface IPromotionParamSearch extends IBaseFilter {
  sku?: string,
  segment?: string,
  value?: number,
  description?: string,
}

export default IPromotionParamSearch;
