import { FC, memo } from 'react';
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import FormErrors from '../../../../components/Form/FormErrors';
import IFormProps from '../../../../contracts/form/IFormProps';
import useResetModalForm from '../../../../hooks/form/useResetModalForm';
import IOrder from '../../../../contracts/general/order/IOrder';
import { orderAvailableStatuses } from '../../../../data/general/orders';
import IOrderChangeStatus from '../../../../contracts/general/order/IOrderChangeStatus';
import IOrderAvailableStatus from '../../../../contracts/general/order/IOrderAvailableStatus';

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

const ChangeOrderStatusForm: FC<IFormProps> = memo(({ open, handleClose, elementToUpdate }) => {
  const classes = useStyles();

  const { handleSubmit, formState: { errors, isValid }, clearErrors, control } = useForm<IOrderChangeStatus>({
    defaultValues: {
      ...elementToUpdate,
    },
    mode: 'all',
  });

  const onSubmit = (data: IOrder) => {
    handleClose(data);
  };

  const callOnUpdate = [
    () => clearErrors(),
  ];

  useResetModalForm(open, "Actualizar", clearErrors, [], callOnUpdate);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      aria-labelledby="coupons-form"
    >
      <DialogTitle id="coupons-form">
        Actualizar Estado de Pedido
      </DialogTitle>

      <FormErrors errors={errors} />

      <DialogContent>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="status">Estado</InputLabel>
          <Controller
            name="status"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El estado es obligatorio.',
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  name="status"
                  value={value}
                  onChange={onChange}
                >
                  <MenuItem value=" ">
                    <em>Por favor seleccione un estado</em>
                  </MenuItem>

                  {
                    orderAvailableStatuses
                      .map((status: IOrderAvailableStatus) => (
                        <MenuItem
                          key={status.id}
                          value={status.value}
                        >
                          {status.label}
                        </MenuItem>
                      ))
                  }
                </Select>
              )
            }}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="description">Descripción</InputLabel>
          <Controller
            name="description"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'La descripción es requerida.',
              },
              minLength: {
                value: 5,
                message: 'La descripción debe ser mayor de 5 caracteres.',
              },
              maxLength: {
                value: 100,
                message: 'La descripción no puede superar los 100 caracteres.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="description"
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
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
)

export default ChangeOrderStatusForm;
