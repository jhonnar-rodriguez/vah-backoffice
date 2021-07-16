import { FC } from "react";
import { List } from "@material-ui/core";
import { FieldErrors, FieldError } from "react-hook-form";

type FormErrorsProps = {
  errors: FieldErrors,
}

const FormErrors: FC<FormErrorsProps> = ({ errors }) => {
  return (
    <List style={{padding: "5px"}}>
      {
        Object
          .values(errors).length ?
          Object
            .values(errors)
            .map((error: FieldError, i) =>
              <li key={i} style={{ color: "red" }}>
                {error.message}
              </li>
            ) :
          ''
      }
    </List>
  )
}

export default FormErrors;
