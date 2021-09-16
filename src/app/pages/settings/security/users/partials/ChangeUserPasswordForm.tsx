import { FC, memo, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Theme,
  Input,
  Button,
  Dialog,
  InputLabel,
  makeStyles,
  FormControl,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import IFormProps from "../../../../../contracts/form/IFormProps";
import useResetModalForm from "../../../../../hooks/form/useResetModalForm";
import FormErrors from "../../../../../components/Form/FormErrors";
import IUser from "../../../../../contracts/security/user/IUser";
import { usersInitialState } from "../../../../../data/security/user";
import { AppState } from "../../../../../../store";
import IChangeUserPassword from "../../../../../contracts/security/user/IChangeUserPassword";

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  datePicker: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const ChangeUserPasswordForm: FC<IFormProps> = memo(({ open, action, handleClose, elementToUpdate }) => {
  const classes = useStyles();
  const { httpRequestReducer } = useSelector((state: AppState) => state);

  const { handleSubmit, formState: { errors, isValid }, reset, clearErrors, control, trigger, watch, getValues } = useForm<IChangeUserPassword>({
    defaultValues: useMemo(() => {
      return {
        ...elementToUpdate,
      };
    }, [elementToUpdate]),
    mode: "all",
  });

  const onSubmit = (data: IChangeUserPassword) => {
    handleClose(data);
  };

  const callOnCreateForm = [
    () => reset(usersInitialState),
  ];

  const callOnUpdate = [
    () => trigger(),
  ];

  useResetModalForm(open, action, clearErrors, callOnCreateForm, callOnUpdate);

  const { isLoading } = httpRequestReducer;

  const password = watch("password");

  return (
    <Dialog
      open={open && !isLoading}
      onClose={handleClose}
      fullWidth
      aria-labelledby="change-password-form"
    >
      <DialogTitle id="change-password-form">
        {`Actualizar contraseña del usuario: ${getValues('name')}`}
      </DialogTitle>

      <FormErrors errors={errors} />

      <DialogContent>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="password">Contraseña</InputLabel>
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "La contraseña es requerida.",
              },
              minLength: {
                value: 5,
                message: "La contraseña debe tener mínimo 5 caracteres.",
              },
              maxLength: {
                value: 20,
                message: "La contraseña no puede superar los 20 caracteres.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="password"
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="password"
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="password_confirmation">Confirmación de Contraseña</InputLabel>
          <Controller
            name="password_confirmation"
            control={control}
            rules={{
              required: {
                value: true,
                message: "La confirmación contraseña es requerida.",
              },
              validate: value => value === password ? true : "La contraseña y la confirmación de contraseña no coinciden, por favor verifique.",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="password"
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="password_confirmation"
              />
            )}
          />
        </FormControl>
      </DialogContent>

      <DialogActions className={classes.formButtonContainer}>
        <Button
          color="default"
          variant="contained"
          onClick={handleClose}
        >
          Cerrar
        </Button>

        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default ChangeUserPasswordForm;
