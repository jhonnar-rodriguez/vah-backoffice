import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetProductsAction } from "../../../../store/actions/product/ProductActions";
import IProcessFilter from "../../../contracts/filter/IProcessFilter";

const useLoadProducts = () => {
  const dispatch = useDispatch();

  const loadProducts = useCallback(
    (filter?: IProcessFilter) => {
      const productsDispatcher = () => dispatch(startGetProductsAction(filter));
      productsDispatcher();
    },
    [],
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return [loadProducts];
}

export default useLoadProducts;
