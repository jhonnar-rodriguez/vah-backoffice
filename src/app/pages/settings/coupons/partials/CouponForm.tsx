import { FC, useMemo } from 'react';
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, FormControlLabel, Input, InputLabel, makeStyles, Switch, Theme } from '@material-ui/core';
import FormErrors from '../../../../components/Form/FormErrors';
import { useState } from 'react';
import IFormProps from '../../../../contracts/form/IFormProps';
import ICustomer from '../../../../contracts/customer/ICustomer';
import useResetModalForm from '../../../../hooks/form/useResetModalForm';
import { memo } from 'react';
import ICoupon from '../../../../contracts/coupon/ICoupon';
import { couponInitialState } from '../../../../data/coupons';
import FormDatePicker from '../../../../components/datePicker/FormDatePicker';
import { moment } from '../../../../../config';

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

const CouponForm: FC<IFormProps> = memo(({ open, action, handleClose, elementToUpdate }) => {
  const classes = useStyles();
  const [creatingCustomer] = useState<boolean>(action === "Crear");

  const { handleSubmit, formState: { errors, isValid, isDirty }, reset, clearErrors, control, trigger, getValues, setError, setValue } = useForm<ICoupon>({
    defaultValues: useMemo(() => {
      return {
        ...elementToUpdate,
      };
    }, [elementToUpdate]),
    mode: 'all',
  });

  const onSubmit = (data: ICustomer) => {
    handleClose(data);
  };

  const handleEndDateSelection = (date: string, onChange: Function) => {
    const startDate = moment(getValues("startDate"));

    if (!startDate.isValid()) {
      setError("startDate", { message: "Por favor introduzca una fecha de inicio válida." });
      return;
    }

    const endDate = moment(date);

    if (!endDate.isSameOrAfter(startDate)) {
      setError("endDate", {
        message: "La fecha de finalización debe ser igual o superior a la fecha de inicio."
      });

      setValue("endDate", "");

      return;
    }

    onChange(date);
  }

  const callOnCreateForm = [
    () => reset(couponInitialState),
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
      aria-labelledby="coupons-form"
    >
      <DialogTitle id="coupons-form">
        {`${action} Cupón`}
      </DialogTitle>

      <FormErrors errors={errors} />

      <DialogContent>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="name">Código</InputLabel>
          <Controller
            name="code"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El código es requerido.',
              },
              minLength: {
                value: 2,
                message: 'El código debe ser mayor de 2 caracteres.',
              },
              maxLength: {
                value: 20,
                message: 'El código no puede superar los 20 caracteres.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={(event) => onChange(event.target.value.toUpperCase())}
                autoComplete="off"
                aria-labelledby="code"
              />
            )}
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
                value: 2,
                message: 'La descripción debe ser mayor de 2 caracteres.',
              },
              maxLength: {
                value: 150,
                message: 'La descripción no puede superar los 150 caracteres.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="document"
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="limit">Límite de Uso</InputLabel>
          <Controller
            name="limit"
            control={control}
            rules={{
              maxLength: {
                value: 2,
                message: 'El límite no debe ser mayor de 99 ni menor de 1.',
              },
              pattern: {
                value: /^([1-9]{1})([0-9]{1})?$/,
                message: 'El límite no debe ser mayor de 99 ni menor de 1.',
              },
              required: {
                value: true,
                message: "El limite es requerido",
              }
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="number"
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="limit"
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <Controller
            name="startDate"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'La fecha de inicio es requerida.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormDatePicker
                value={value}
                label="Fecha de Inicio"
                onChange={onChange}
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'La fecha de finalización es requerida.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormDatePicker
                value={value}
                label="Fecha de finalización"
                onChange={(date: string) => handleEndDateSelection(date, onChange)}
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <Controller
            name="isFirst"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                label="¿Es de Primera Compra?"
                control={
                  <Switch
                    color="primary"
                    checked={value}
                    onChange={onChange}
                  />
                }
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
          disabled={(creatingCustomer && !isDirty) || !isValid}
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
)

export default CouponForm;
