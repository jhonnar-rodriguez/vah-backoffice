import { ChangeEvent, FC, useMemo } from 'react';
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Input, InputLabel, makeStyles, MenuItem, Theme } from '@material-ui/core';
import { Select } from '@material-ui/core';
import FormErrors from '../../../../components/Form/FormErrors';
import { useState } from 'react';
import IFormProps from '../../../../contracts/form/IFormProps';
import ICustomer, { IDocumentType } from '../../../../contracts/customer/ICustomer';
import { customerInitialState, documentTypes } from '../../../../data/customers';
import useResetModalForm from '../../../../hooks/form/useResetModalForm';
import { memo } from 'react';

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

const documentTypeInitialRules = {
  required: {
    value: true,
    message: 'El documento es requerido.',
  },
};

const CustomerForm: FC<IFormProps> = memo(({ open, action, handleClose, elementToUpdate }) => {
  const classes = useStyles();
  const [documentRules, setDocumentRules] = useState<RegisterOptions>(documentTypeInitialRules);
  const [creatingCustomer] = useState<boolean>(action === "Crear");

  const { handleSubmit, formState: { errors, isValid, isDirty }, reset, clearErrors, control, setValue, trigger } = useForm<ICustomer>({
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

  const callOnCreateForm = [
    () => reset(customerInitialState, { keepDirty: true, keepIsValid: true }),
    () => setDocumentRules(documentTypeInitialRules),
  ];

  const callOnUpdate = [
    () => trigger(),
  ];

  useResetModalForm(open, action, clearErrors, callOnCreateForm, callOnUpdate);

  const handleDocumentTypeSelection = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, onChange: Function) => {
    const selectedDocumentType = event.target.value;
    onChange(selectedDocumentType);

    const documentTypePattern = documentTypes.find((type: IDocumentType) => type.value === selectedDocumentType)?.pattern;

    if (typeof documentTypePattern === "undefined") {
      setDocumentRules(documentTypeInitialRules);
      return;
    };

    setDocumentRules(documentRules => ({
      ...documentRules,
      pattern: {
        value: new RegExp(documentTypePattern),
        message: "Por favor introduzca un documento válido.",
      },
    }));

    setValue("document", "");
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="customers-form"
      fullWidth
    >
      <DialogTitle id="customers-form">
        {`${action} Cliente`}
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
          <InputLabel id="surname">Apellido</InputLabel>
          <Controller
            name="surname"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El apellido es requerido.',
              },
              maxLength: {
                value: 50,
                message: 'El apellido no puede superar los 50 caracteres.',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="surname"
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="code">Código de Usuario</InputLabel>
          <Controller
            name="code"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El código es requerido.',
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
          <InputLabel id="email">Correo Electrónico</InputLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El email es requerido.',
              },
              maxLength: {
                value: 100,
                message: 'El email no puede superar los 100 caracteres.',
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

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="mobile">Teléfono</InputLabel>
          <Controller
            name="mobile"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El teléfono es requerida.',
              },
              maxLength: {
                value: 20,
                message: 'La teléfono no puede superar los 20 caracteres.',
              },
              pattern: {
                value: /^([2-9])([0-9])(\d{2})(-?|\040?)(\d{4})( ?|\040?)(\d{1,4}?|\040?)$/,
                message: "Por favor introduzca un teléfono válido."
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="mobile"
              />
            )}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="documentType">Tipo de Documento</InputLabel>
          <Controller
            name="documentType"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'El tipo documento es requerido.',
              },
              minLength: {
                value: 2,
                message: 'El tipo documento es requerido.',
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  name="documentType"
                  value={typeof value.value === "string" ? value.value : String(value)}
                  onChange={(event) => handleDocumentTypeSelection(event, onChange)}
                >
                  <MenuItem value=" ">
                    <em>Por favor seleccione un tipo de documento</em>
                  </MenuItem>

                  {
                    documentTypes
                      .map((documentType: IDocumentType, i) => (
                        <MenuItem
                          key={i}
                          value={documentType.value}
                        >
                          {documentType.name}
                        </MenuItem>
                      ))
                  }
                </Select>
              )
            }}
          />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="document">Documento</InputLabel>
          <Controller
            name="document"
            control={control}
            rules={documentRules}
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                value={value}
                onChange={onChange}
                autoComplete="off"
                aria-labelledby="document"
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

export default CustomerForm;
