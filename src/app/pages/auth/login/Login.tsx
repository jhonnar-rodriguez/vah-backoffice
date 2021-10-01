import { ReactElement } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../../../components/layout/main/partials/Copyright";
import { Controller, useForm } from "react-hook-form";
import ICredentials from "../../../contracts/auth/ICredentials";
import FormErrors from "../../../components/Form/FormErrors";
import { useDispatch, useSelector } from "react-redux";
import { startAuthAction } from "../../../../store/actions/auth/AuthActions";
import { AppState } from "../../../../store";
import SnackBar from "../../../components/snackBar/SnackBar";
import { startResetStateAction } from "../../../../store/actions/httpRequest/HttpRequestActions";
import { Redirect } from "react-router-dom";
import useLoadAuthentication from "../../../hooks/auth/useLoadAuthentication";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { authReducer, httpRequestReducer } = useSelector((state: AppState) => state);

  const { isAuthenticated } = authReducer;
  const { error, isLoading } = httpRequestReducer;
  const { handleSubmit, formState: { errors, isValid }, control } = useForm<ICredentials>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  });

  useLoadAuthentication();

  const onSubmit = (credentials: ICredentials): void => {
    const dispatcher = () => dispatch(startAuthAction(credentials));
    dispatcher();
  };

  const resetHttpState = (): void => {
    const dispatcher = () => dispatch(startResetStateAction());
    dispatcher();
  };

  const checkForHttpErrors = (): ReactElement | void => {
    if (error?.statusCode === 429) {
      return <SnackBar
        message= "Se ha alcanzado el número máximo de intentos, por favor intente más tarde."
        severity="error"
        onDismiss={resetHttpState}
      />
    }
    else if (!isLoading && typeof error?.message !== "undefined" && error.message.length > 0) {
      return <SnackBar
        message="Las credenciales no coinciden con nuestros registros"
        severity="error"
        onDismiss={resetHttpState}
      />
    }
  }

  const renderLogin = (): ReactElement => (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>

        <FormErrors errors={errors} />

        {checkForHttpErrors()}

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El nombre de usuario es requerido.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Nombre de Usuario"
                name="username"
                autoComplete="off"
                autoFocus
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "La contraseña es requerida.",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                value={value}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValid}
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )

  return (
    <>
      {
        isAuthenticated ?
          <Redirect to="/dashboard" /> :
          renderLogin()
      }
    </>
  );
}

export default Login;
