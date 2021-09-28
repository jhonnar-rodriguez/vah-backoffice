import IPagination from "../../table/IPagination";
import IPromotion from "../IPromotion";

interface IPromotionsPaginated extends IPagination {
  promotions: IPromotion[],
}

export default IPromotionsPaginated;
