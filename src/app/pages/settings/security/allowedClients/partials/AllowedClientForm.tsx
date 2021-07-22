import { FC, memo, useMemo, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Input, InputLabel, makeStyles, Theme } from '@material-ui/core';
import IFormProps from '../../../../../contracts/form/IFormProps';
import IAllowedClient from '../../../../../contracts/security/allowedClient/IAllowedClient';
import { allowedClientsInitialState } from '../../../../../data/security/allowedClient';
import useResetModalForm from '../../../../../hooks/form/useResetModalForm';
import FormErrors from '../../../../../components/Form/FormErrors';

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

const urlRegExp = /^(?![^\n]*\.$)(?:https?:\/\/)?(?:(?:[2][1-4]\d|25[1-5]|1\d{2}|[1-9]\d|[1-9])(?:\.(?:[2][1-4]\d|25[1-5]|1\d{2}|[1-9]\d|[0-9])){3}(?::\d{4})?|[a-z-]+(?:\.[a-z-]+){2,})$/;

const AllowedClientForm: FC<IFormProps> = memo(({ open, action, handleClose, elementToUpdate }) => {
  const classes = useStyles();
  const [creatingAllowedClient] = useState<boolean>(action === "Crear");

  const { handleSubmit, formState: { errors, isValid, isDirty }, reset, clearErrors, control, trigger, getValues } = useForm<IAllowedClient>({
    defaultValues: useMemo(() => {
      return {
        ...elementToUpdate,
      };
    }, [elementToUpdate]),
    mode: 'all',
  });

  const onSubmit = (data: IAllowedClient) => {
    handleClose(data);
  };

  const callOnCreateForm = [
    () => reset(allowedClientsInitialState),
  ];

  const callOnUpdate = [
    () => trigger(),
  ];

  useResetModalForm(open, action, clearErrors, callOnCreateForm, callOnUpdate);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      aria-labelledby="clients-form"
    >
      <DialogTitle id="clients-form">
        {`${action} Aplicación`}
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
                message: 'El nombre es requerido.',
              },
              minLength: {
                value: 2,
                message: 'El nombre debe ser mayor de 2 caracteres.',
              },
              maxLength: {
                value: 50,
                message: 'El nombre no puede superar los 50 caracteres.',
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
          <InputLabel id="provider">Proveedor</InputLabel>
          <Controller
            name="provider"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El proveedor es requerido.',
              },
              minLength: {
                value: 2,
                message: 'El proveedor debe ser mayor de 2 caracteres.',
              },
              maxLength: {
                value: 50,
                message: 'El proveedor no puede superar los 50 caracteres.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="provider"
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="notificationUrl">Url de Notificación</InputLabel>
          <Controller
            name="notificationUrl"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'La url de notificación es requerida.',
              },
              pattern: {
                value: urlRegExp,
                message: 'Por favor introduzca una url de notificación válida.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="notificationUrl"
                placeholder="https://www.notification-url.com"
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="url">Url</InputLabel>
          <Controller
            name="url"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'La url es requerida.',
              },
              pattern: {
                value: urlRegExp,
                message: 'Por favor introduzca una url válida.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="off"
                placeholder="https://www.mobile-url.com"
                aria-labelledby="url"
              />
            )}
          />
        </FormControl>

        {
          !creatingAllowedClient && (
            <>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="secret">Llave Secreta</InputLabel>
                <Input
                  value={getValues("secret") ?? "N/A"}
                  disabled
                  aria-labelledby="secret"
                />
              </FormControl>

              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="revoked">¿Revocado?</InputLabel>
                <Input
                  value={getValues("revoked") === true ? "Si" : "No"}
                  disabled
                  aria-labelledby="revoked"
                />
              </FormControl>
            </>
          )
        }

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
          disabled={(creatingAllowedClient && !isDirty) || !isValid}
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
)

export default AllowedClientForm;
