import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetProductsAction } from "../../../../store/actions/product/ProductActions";

const useLoadProducts = () => {
  const dispatch = useDispatch();

  const loadProducts = useCallback(
    (q?: string) => {
      const productsDispatcher = () => dispatch(startGetProductsAction(q));
      productsDispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return [loadProducts];
}

export default useLoadProducts;
