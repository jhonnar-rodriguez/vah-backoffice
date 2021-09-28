import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetPromotionsAction } from "../../../../store/actions/promotion/PromotionActions";
import IProcessFilter from "../../../contracts/filter/IProcessFilter";

const useLoadPromotions = () => {
  const dispatch = useDispatch();

  const loadPromotions = useCallback(
    (filter?: IProcessFilter) => {
      const productsDispatcher = () => dispatch(startGetPromotionsAction(filter));
      productsDispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadPromotions();
  }, [loadPromotions]);

  return [loadPromotions];
}

export default useLoadPromotions;
