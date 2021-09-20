import { FC, FormEvent, ReactElement, useState } from 'react';
import {
  Theme,
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core';
import SnackBar from '../snackBar/SnackBar';
import esLocale from 'date-fns/locale/es';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { moment } from '../../../config';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(3),
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  datePicker: {
    marginRight: theme.spacing(1),
  },
  formControl: {
    marginRight: theme.spacing(2),
  },
}));

type ReportsSearchBarProps = {
  onSubmit: Function,
  filterBy: 'products' | 'customers',
}

type DateChangeProps = {
  endDate: Date | null,
  startDate: Date | null,
}

const datePropsInitialValues: DateChangeProps = {
  endDate: null,
  startDate: null,
}

const ReportsSearchBar: FC<ReportsSearchBarProps> = ({ onSubmit, filterBy }): ReactElement => {
  const classes = useStyles();
  const [searchBy] = useState<'mobiles' | 'products'>(filterBy === 'customers' ? 'mobiles' : 'products');
  const [dates, setDateChange] = useState<DateChangeProps>(datePropsInitialValues);
  const [filterApplied, setFilterApplied] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const { endDate, startDate } = dates;

  const handleDateChange = (type: 'startDate' | 'endDate', date: MaterialUiPickersDate): void => {
    if (type === 'startDate') {
      const formattedEndDate = moment(endDate);
      const formattedStartDate = moment(date);

      if (endDate !== null && (!formattedEndDate.isValid() || formattedStartDate.isBefore(formattedEndDate))) {
        setValidationMessage('La fecha de inicio no puede ser menor a la fecha fin, por favor verifique!');

        return;
      }
    } else {
      const formattedEndDate = moment(date);
      const formattedStartDate = moment(startDate);

      if (!formattedStartDate.isValid()) {
        setValidationMessage('Por favor ingresa primero la fecha de inicio.');

        return;
      }

      if (formattedEndDate.isBefore(formattedStartDate)) {
        setValidationMessage('La fecha fin no puede ser menor a la fecha de inicio, por favor verifique!');

        return;
      }
    }

    setDateChange({
      ...dates,
      [type]: date,
    });
  }

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (formIsValid()) {
      const formattedEndDate = moment(endDate);
      const formattedStartDate = moment(startDate);
      const serverFormats: string = 'YYYY-MM-DD';

      onSubmit({
        date_start: formattedStartDate.isValid() ? formattedStartDate.format(serverFormats) : '',
        date_end: formattedEndDate.isValid() ? formattedEndDate.format(serverFormats) : '',
        [searchBy]: filterApplied.length ? filterApplied.split(',') : '',
      });

      return;
    };

    setValidationMessage('Por favor valida que todos los campos tengan los valores esperados!');
  }

  const formIsValid = (): boolean => {
    const formattedEndDate = moment(endDate);
    const formattedStartDate = moment(startDate);

    if (formattedEndDate.isValid() && formattedStartDate.isValid()) {
      return true;
    } else if (filterApplied.length > 0) {
      if ((startDate !== null && formattedStartDate.isValid()) && (endDate === null || !formattedEndDate.isValid())) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  }

  const handleResetFilters = (): void => {
    setDateChange(datePropsInitialValues);
    setFilterApplied('');

    onSubmit({
      date_end: null,
      products: [],
      date_start: null,
    });
  }

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={classes.root}
    >
      {
        validationMessage.length > 0 &&
        <SnackBar
          message={validationMessage}
          duration={8000}
          severity='info'
          onDismiss={() => setValidationMessage('')}
        />
      }

      <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={esLocale}
      >
        <KeyboardDatePicker
          id='date-start'
          value={startDate}
          label='Fecha Inicio'
          format='dd/MM/yyyy'
          onChange={(value) => handleDateChange('startDate', value)}
          className={classes.formControl}
          autoComplete='off'
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardDatePicker
          id='date-end'
          value={endDate}
          label='Fecha Fin'
          format='dd/MM/yyyy'
          onChange={(value) => handleDateChange('endDate', value)}
          className={classes.formControl}
          autoComplete='off'
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>

      <TextField
        id='filterApplied'
        name='filterApplied'
        label={filterBy === 'products' ? 'SKU' : 'Celular'}
        value={filterApplied}
        variant='standard'
        onChange={(event) => setFilterApplied(event?.target.value)}
        className={classes.formControl}
        autoComplete='off'
      />

      <Button
        color='secondary'
        variant='outlined'
        onClick={() => handleResetFilters()}
        className={classes.button}
      >
        Borrar filtros
      </Button>

      <Button
        type='submit'
        variant='outlined'
        disabled={!formIsValid()}
        className={classes.button}
      >
        Filtrar
      </Button>
    </form>
  )
}

export default ReportsSearchBar;
