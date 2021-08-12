import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AppState } from "../../../store";
import { startResetStateAction } from "../../../store/actions/httpRequest/HttpRequestActions";
import { LocalStorageHelper } from "../../helpers";
import SnackBar from "../snackBar/SnackBar";

const ErrorHandler = () => {
  const history = useHistory();
  const dispatch = useDispatch()

  const httpRequestReducer = useSelector((state: AppState) => state.httpRequestReducer);
  const { error } = httpRequestReducer;

  const resetReducerMainState = useCallback(
    () => {
      const actionDispatcher = () => dispatch(startResetStateAction());
      actionDispatcher();
    },
    [dispatch],
  );

  const handleError = useCallback(
    () => {
      if (error?.statusCode === 401) {
        LocalStorageHelper.removeAuthenticationKeys();
        history.push("/auth/login");
        return;
      };

      if (error?.statusCode === 500) {
        history.push("/dashboard");
        return;
      };
    },
    [error, history],
  )

  useEffect(() => {
    handleError();
  }, [handleError]);

  return (
    <>
      {
        typeof error !== "undefined" && error.message.length > 0 &&
        <SnackBar
          message={error.message}
          severity="error"
          onDismiss={() => resetReducerMainState()}
        />
      }
    </>
  )
}

export default ErrorHandler;
