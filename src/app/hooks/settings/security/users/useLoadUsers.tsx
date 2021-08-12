import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetUsersAction } from "../../../../../store/actions/settings/security/user/UserActions";

const useLoadUsers = () => {
  const dispatch = useDispatch();

  const loadUsers = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetUsersAction());
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return [];
}

export default useLoadUsers;
