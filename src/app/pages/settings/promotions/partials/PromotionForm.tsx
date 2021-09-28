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
          <InputLabel id='segment'>Segmento</InputLabel>
          <Controller
            name='segment'
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
          <InputLabel id='sku'>sku</InputLabel>
          <Controller
            name='sku'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El sku es requerido.',
              },
              maxLength: {
                value: 200,
                message: 'El sku no puede superar los 200 caracteres.',
              },
              pattern: {
                value: /^[A-Za-z0-9,]$/,
                message: 'Por favor introduzca un precio sku válido.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                placeholder='ABCDE, EFGHI, JKLMN'
                autoComplete='off'
                aria-labelledby='sku'
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id='value'>Precio</InputLabel>
          <Controller
            name='value'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El precio es requerido.',
              },
              pattern: {
                value: /^[0-9]+(\.[0-9]{2})?$/,
                message: 'Por favor introduzca un precio válido.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type='number'
                value={value}
                onChange={onChange}
                autoComplete='off'
                aria-labelledby='value'
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
