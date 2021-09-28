import IBaseFilter from "./IBaseFilter";

interface IPromotionParamSearch extends IBaseFilter {
  sku?: string,
  segment?: string,
  price?: number,
  description?: string,
}

export default IPromotionParamSearch;
