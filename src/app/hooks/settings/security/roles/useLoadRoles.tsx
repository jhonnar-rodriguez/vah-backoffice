import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetRolesAction } from "../../../../../store/actions/settings/security/role/RoleActions";

const useLoadRoles = () => {
  const dispatch = useDispatch();

  const loadRoles = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetRolesAction());
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  return [];
}

export default useLoadRoles;
