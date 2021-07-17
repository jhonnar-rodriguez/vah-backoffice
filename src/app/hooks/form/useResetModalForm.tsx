/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

const useResetModalForm = (
  open: boolean,
  action: string,
  clearErrors: Function,
  callOnCreate: Function[],
  callOnUpdate?: Function[],
) => {

  useEffect(() => {
    if (open) {
      if (action === "Crear") {
        callOnCreate.map((callable: Function) => typeof callable === "function" && callable());
      } else if (action === "Actualizar") {
        callOnUpdate?.length && callOnUpdate.map((callable: Function) => typeof callable === "function" && callable());
      }

      clearErrors();
    };
  }, [open, action, clearErrors]);

  return [];
};

export default useResetModalForm;
