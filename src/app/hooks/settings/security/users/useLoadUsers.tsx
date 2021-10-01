import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startGetUsersAction } from "../../../../../store/actions/settings/security/user/UserActions";
import IProcessFilter from "../../../../contracts/filter/IProcessFilter";

const useLoadUsers = () => {
  const dispatch = useDispatch();

  const loadUsers = useCallback(
    (filter?: IProcessFilter) => {
      const dispatcher = () => dispatch(startGetUsersAction(filter));
      dispatcher();
    },
    [dispatch],
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return [loadUsers];
}

export default useLoadUsers;
