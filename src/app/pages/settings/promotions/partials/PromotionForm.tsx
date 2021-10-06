import { FC, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Input, InputLabel, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store';
import FormErrors from '../../../../components/Form/FormErrors';
import { useState } from 'react';
import IPromotion from '../../../../contracts/promotion/IPromotion';
import { promotionInitialState } from '../../../../data/promotions';
import useResetModalForm from '../../../../hooks/form/useResetModalForm';

type PromotionFormProps = {
  open: boolean,
  action: string,
  handleClose: any,
  promotionToUpdate: IPromotion,
}

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const PromotionForm: FC<PromotionFormProps> = ({ open, action, handleClose, promotionToUpdate }) => {
  const classes = useStyles();
  const [creatingProduct] = useState<boolean>(action === 'Crear');
  const { httpRequestReducer } = useSelector((state: AppState) => state);

  const { handleSubmit, formState: { errors, isValid, isDirty }, reset, clearErrors, control, trigger } = useForm<IPromotion>({
    defaultValues: useMemo(() => {
      return {
        ...promotionToUpdate,
        rules: JSON.stringify(promotionToUpdate.rules)
      };
    }, [promotionToUpdate]),
    mode: 'all',
  });

  const { isLoading } = httpRequestReducer;

  const onSubmit = (data: IPromotion) => {
    handleClose(data);
  };

  const callOnCreateForm = [
    () => reset(promotionInitialState, { keepDirty: true, keepIsValid: true }),
  ];

  const callOnUpdate = [
    () => trigger(),
  ];

  useResetModalForm(open, action, clearErrors, callOnCreateForm, callOnUpdate);

  return (
    <Dialog
      open={open && !isLoading}
      onClose={handleClose}
      aria-labelledby='promotions-form'
      fullWidth
    >
      <DialogTitle id='promotions-form'>
        {`${action} Promoción`}
      </DialogTitle>

      <FormErrors errors={errors} />

      <DialogContent>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id='name'>Segmento</InputLabel>
          <Controller
            name='name'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El segmento es requerido.',
              },
              maxLength: {
                value: 100,
                message: 'El segmento no puede superar los 100 caracteres.',
              },
              pattern: {
                value: /^[A-Za-z_\s]+$/,
                message: 'Por favor un segmento válido.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete='off'
                aria-labelledby='segment'
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id='rules'>Reglas</InputLabel>
          <Controller
            name='rules'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Las reglas son requerido.',
              },
              maxLength: {
                value: 500,
                message: 'Las reglas no pueden superar los 500 caracteres.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder=' { "discounts": [ { "sku": "BA012484", "quantity": 5, "fixedPrice": 1 }, { "sku": "BA007094", "quantity": 5, "fixedPrice": 1 } ], "promotions": [ { "sku": "BA012489", "quantity": 100, "fixedPrice": 0, "gift": 2 }, { "sku": "BA012490", "quantity": 100, "fixedPrice": 0, "gift": 2 } ] } '
                autoComplete='off'
                aria-labelledby='details'
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id='description'>Descripción</InputLabel>
          <Controller
            name='description'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'La descripción es requerida.',
              },
              maxLength: {
                value: 100,
                message: 'La descripción no puede superar los 100 caracteres.',
              },
              pattern: {
                value: /^[A-Za-z0-9,\s]+$/,
                message: 'Por favor introduzca una descripción válida.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete='off'
                aria-labelledby='description'
              />
            )}
          />
        </FormControl>

      </DialogContent>

      <DialogActions className={classes.formButtonContainer}>
        <Button
          color='default'
          variant='contained'
          onClick={handleClose}
        >
          Cerrar
        </Button>

        <Button
          type='submit'
          color='primary'
          variant='contained'
          onClick={handleSubmit(onSubmit)}
          disabled={(creatingProduct && !isDirty) || !isValid}
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PromotionForm;
