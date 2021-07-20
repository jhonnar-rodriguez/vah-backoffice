import { useEffect } from "react";
import { IElementToUpdate } from "../../contracts/form/IFormProps";

const useSetFormValues = (elementToUpdate: IElementToUpdate, reset: Function) => {
  useEffect(() => {
    if (elementToUpdate._id.length > 0) {
      reset({ ...elementToUpdate });
    };
  }, [reset, elementToUpdate]);

  return [];
};

export default useSetFormValues;
