import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetClientsAction } from "../../../../../store/actions/allowedClient/AllowedClientActions";
import IProcessFilter from "../../../../contracts/filter/IProcessFilter";

const useLoadAllowedClients = () => {
  const dispatch = useDispatch();

  const loadAllowedClients = useCallback(
    (filter?: IProcessFilter) => {
      const dispatcher = () => dispatch(startGetClientsAction(filter));
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadAllowedClients();
  }, [loadAllowedClients]);

  return [loadAllowedClients];
}

export default useLoadAllowedClients;
