import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetClientsAction } from "../../../../../store/actions/allowedClient/AllowedClientActions";

const useLoadAllowedClients = () => {
  const dispatch = useDispatch();

  const loadAllowedClients = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetClientsAction());
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadAllowedClients();
  }, [loadAllowedClients]);

  return [];
}

export default useLoadAllowedClients;
