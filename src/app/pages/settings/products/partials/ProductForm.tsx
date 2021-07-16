import { FC, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Input, InputLabel, makeStyles, MenuItem, Theme } from '@material-ui/core';
import { Select } from '@material-ui/core';
import useLoadCategories from '../../../../hooks/settings/categories/useLoadCategories';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../store';
import ICategory from '../../../../contracts/category/ICategory';
import FormErrors from '../../../../components/Form/FormErrors';

type ProductFormProps = {
  open: boolean,
  action: string,
  handleClose: any,
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
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ProductForm: FC<ProductFormProps> = ({ open, action, handleClose }) => {
  const classes = useStyles();
  const { categoryReducer } = useSelector((state: AppState) => state);

  const defaultValues = {
    name: "",
    category: " ",
    sku: "",
    summary: "",
    description: "",
    urlImage: "",
    price: 1,
    quantity: 1,
  };

  const { handleSubmit, formState: { errors, isValid }, reset, clearErrors, control } = useForm({
    defaultValues,
    mode: 'all',
  });

  const { list: categories } = categoryReducer;

  const onSubmit = (data: any) => console.log(data);

  const [fetchCategories] = useLoadCategories();

  useEffect(() => {
    if (open) {
      reset();
      clearErrors();
      fetchCategories();
    }
  }, [open, reset, clearErrors, fetchCategories]);

  return (
    <form onSubmit={() => console.log('Handle Form Submit')}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="products-form"
        fullWidth
      >
        <DialogTitle id="products-form">
          {`${action} Producto`}
        </DialogTitle>

        <FormErrors errors={errors} />

        <DialogContent>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="name">Nombre</InputLabel>
            <Controller
              key="name"
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'El nombre es requerido.',
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
            <InputLabel id="sku">sku</InputLabel>
            <Controller
              key="sku"
              name="sku"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'El sku es requerido.',
                },
                maxLength: {
                  value: 20,
                  message: 'El sku no puede superar los 20 caracteres.',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  autoComplete="off"
                  aria-labelledby="sku"
                />
              )}
            />
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="summary">Resumen</InputLabel>
            <Controller
              key="summary"
              name="summary"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'El resumen es requerido.',
                },
                maxLength: {
                  value: 100,
                  message: 'El resumen no puede superar los 100 caracteres.',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  autoComplete="off"
                  aria-labelledby="summary"
                />
              )}
            />
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="description">Descripción</InputLabel>
            <Controller
              key="description"
              name="description"
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
                  autoComplete="off"
                  aria-labelledby="description"
                />
              )}
            />
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="price">Precio</InputLabel>
            <Controller
              key="price"
              name="price"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'El precio es requerido.',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  autoComplete="off"
                  aria-labelledby="price"
                  type="number"
                />
              )}
            />
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="quantity">Cantidad</InputLabel>
            <Controller
              key="quantity"
              name="quantity"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'La cantidad es requerida.',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  autoComplete="off"
                  aria-labelledby="quantity"
                  type="number"
                />
              )}
            />
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="category">Categoría</InputLabel>
            <Controller
              key="category"
              name="category"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'La categoría es requerida.'
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                >
                  <MenuItem value=" ">
                    <em>Por favor seleccione una categoría</em>
                  </MenuItem>

                  {
                    categories
                      .map((category: ICategory) => (
                        <MenuItem
                          key={category._id}
                          value={category._id}
                        >
                          {category.name}
                        </MenuItem>
                      ))
                  }
                </Select>
              )}
            />

          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="urlImage">Imagen</InputLabel>
            <Controller
              key="urlImage"
              name="urlImage"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'La imagen es requerida.',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  autoComplete="off"
                  aria-labelledby="urlImage"
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
    </form>
  );
}

export default ProductForm;
