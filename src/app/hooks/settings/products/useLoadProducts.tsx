import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetProductsAction } from "../../../../store/actions/product/ProductActions";

const useLoadProducts = () => {
  const dispatch = useDispatch();

  const loadProducts = useCallback(
    () => {
      const productsDispatcher = () => dispatch(startGetProductsAction());
      productsDispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return [];
}

export default useLoadProducts;
