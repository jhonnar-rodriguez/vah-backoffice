import { useEffect, useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Theme, makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Input,
  Button,
  InputLabel,
  Typography,
  FormControl,
} from "@material-ui/core";
import { AppState } from '../../../../store';
import IChangeUserPassword from "../../../contracts/security/user/IChangeUserPassword";
import FormErrors from "../../../components/Form/FormErrors";
import { startChangePasswordAction } from "../../../../store/actions/profile/ProfileActions";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  container: {
    padding: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
}));

const userInitialStateObject = {
  _id: '',
  password: '',
  old_password: '',
  password_confirmation: '',
};

const ChangePassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { httpRequestReducer, authReducer } = useSelector((state: AppState) => state);
  const { auth: { user: { _id: userId } } } = authReducer;

  const [userInitialState, setUserInitialState] = useState<IChangeUserPassword>(userInitialStateObject);

  useEffect(() => {
    if (userId.length > 0) {
      setUserInitialState({
        ...userInitialStateObject,
        _id: userId,
      });
    }
  }, [userId]);

  const { watch, reset, control, clearErrors, handleSubmit, formState: { errors, isValid } } = useForm<IChangeUserPassword>({
    mode: "all",
    defaultValues: userInitialState,
  });

  const resetForm = useCallback(
    () => {
      reset();
      clearErrors();
    },
    [reset, clearErrors],
  );

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onSubmit = (user: IChangeUserPassword) => {
    if (typeof user === 'undefined' || typeof user.old_password === 'undefined' || user.old_password.length === 0 || typeof user.password === 'undefined' || user.password.length === 0) {
      return;
    }

    const userInfo = {
      ...user,
      _id: userId,
    };

    const dispatcher = () => dispatch(startChangePasswordAction(userInfo));
    dispatcher();
  };

  const { isLoading } = httpRequestReducer;

  const password = watch("password");

  return (
    <Paper className={classes.root}>
      <div>
        <Typography variant="h4" style={{ padding: "5px" }}>
          Actualizar contraseña
        </Typography>
      </div>

      <Grid container spacing={3} className={classes.container}>

        <FormErrors errors={errors} />

        <Grid item xs={12}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="old_password">Contraseña anterior</InputLabel>
            <Controller
              name="old_password"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "La contraseña anterior es requerida.",
                },
                minLength: {
                  value: 5,
                  message: "La contraseña anterior debe tener mínimo 5 caracteres.",
                },
                maxLength: {
                  value: 20,
                  message: "La contraseña anterior no puede superar los 20 caracteres.",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="password"
                  value={value}
                  onChange={onChange}
                  autoComplete="off"
                  aria-labelledby="old_password"
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="password">Contraseña nueva</InputLabel>
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
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="password_confirmation">Confirmación de contraseña nueva</InputLabel>
            <Controller
              name="password_confirmation"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "La contraseña nueva contraseña es requerida.",
                },
                validate: value => value === password ? true : "La contraseña nueva y la contraseña nueva de contraseña no coinciden, por favor verifique.",
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
        </Grid>

        <Grid item xs={12} className={classes.buttonContainer}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isLoading}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>

    </Paper>
  );
};

export default ChangePassword;
