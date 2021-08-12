import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startCheckForAuthenticationAction } from "../../../store/actions/auth/AuthActions";

const useLoadAuthentication = () => {
  const dispatch = useDispatch();

  const loadAuthentication = useCallback(
    () => {
      const dispatcher = () => dispatch(startCheckForAuthenticationAction());
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadAuthentication();
  }, [loadAuthentication]);

  return [];
}

export default useLoadAuthentication;
