import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startGetCategoriesAction } from "../../../../store/actions/category/CategoryActions";

const useLoadCategories = () => {
  const dispatch = useDispatch();

  const fetchCategories = useCallback(
    () => {
      const productsDispatcher = () => dispatch(startGetCategoriesAction());
      productsDispatcher();
    },
    [dispatch],
  );

  return [fetchCategories];
}

export default useLoadCategories;
