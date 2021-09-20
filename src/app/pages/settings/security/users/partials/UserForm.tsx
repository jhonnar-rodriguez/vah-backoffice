import { FC, memo, useMemo, useState, ReactElement } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Theme,
  Input,
  Button,
  Dialog,
  Select,
  MenuItem,
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
import useLoadRoles from "../../../../../hooks/settings/security/roles/useLoadRoles";
import { AppState } from "../../../../../../store";
import IRole from "../../../../../contracts/security/role/IRole";

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

const UserForm: FC<IFormProps> = memo(({ open, action, handleClose, elementToUpdate }) => {
  const classes = useStyles();
  const [createUser] = useState<boolean>(action === "Crear");
  const { roleReducer, httpRequestReducer } = useSelector((state: AppState) => state);

  const { handleSubmit, formState: { errors, isValid, isDirty }, reset, clearErrors, control, trigger, watch } = useForm<IUser>({
    defaultValues: useMemo(() => {
      return {
        ...elementToUpdate,
      };
    }, [elementToUpdate]),
    mode: "all",
  });

  const onSubmit = (data: IUser) => {
    handleClose(data);
  };

  const callOnCreateForm = [
    () => reset(usersInitialState),
  ];

  const callOnUpdate = [
    () => trigger(),
  ];

  useResetModalForm(open, action, clearErrors, callOnCreateForm, callOnUpdate);

  useLoadRoles();

  const { list: roles } = roleReducer;
  const { isLoading } = httpRequestReducer;

  const password = watch("password");

  const renderPasswordFields = (): ReactElement => (
    <>
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
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/i,
              message: "la contraseña debe tener una letra minúscula, una mayúscula, un numero y un carácter especial."
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
    </>
  );

  return (
    <Dialog
      open={open && !isLoading}
      onClose={handleClose}
      fullWidth
      aria-labelledby="users-form"
    >
      <DialogTitle id="users-form">
        {`${action} Usuario`}
      </DialogTitle>

      <FormErrors errors={errors} />

      <DialogContent>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="name">Nombre</InputLabel>
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El nombre es requerido.",
              },
              minLength: {
                value: 2,
                message: "El nombre debe ser mayor de 2 caracteres.",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede superar los 50 caracteres.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="name"
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="lastname">Apellido</InputLabel>
          <Controller
            name="lastname"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El apellido es requerido.",
              },
              minLength: {
                value: 2,
                message: "El apellido debe ser mayor de 2 caracteres.",
              },
              maxLength: {
                value: 50,
                message: "El apellido no puede superar los 50 caracteres.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="lastname"
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="username">Usuario</InputLabel>
          <Controller
            name="username"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El usuario es requerido.",
              },
              minLength: {
                value: 2,
                message: "El usuario debe ser mayor de 2 caracteres.",
              },
              maxLength: {
                value: 50,
                message: "El usuario no puede superar los 50 caracteres.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="username"
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="role">Rol</InputLabel>
          <Controller
            name="role"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El rol es requerido.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                value={typeof value._id === "string" ? value._id : value}
                onChange={onChange}
              >
                <MenuItem value=" ">
                  <em>Por favor seleccione un rol</em>
                </MenuItem>

                {
                  roles
                    .map((role: IRole) => (
                      <MenuItem
                        key={role._id}
                        value={role._id}
                      >
                        {role.name.toUpperCase()}
                      </MenuItem>
                    ))
                }
              </Select>
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="email">Correo Electrónico</InputLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El email es requerido.",
              },
              maxLength: {
                value: 100,
                message: "El email no puede superar los 100 caracteres.",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Por favor introduzca un email válido."
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="email"
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="email"
              />
            )}
          />
        </FormControl>

        {createUser && renderPasswordFields()}

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
          disabled={(createUser && !isDirty) || !isValid}
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
)

export default UserForm;
