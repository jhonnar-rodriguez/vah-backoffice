import { FC, FormEvent, ReactElement, useState } from "react";
import { Button, makeStyles, MenuItem, Select, TextField, Theme } from "@material-ui/core";
import IFilter from "../../contracts/filter/IFilter";
import SnackBar from "../snackBar/SnackBar";
import moment from '../../../config/moment';
import esLocale from 'date-fns/locale/es';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(3),
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  datePicker: {
    flexGrow: .6,
    margin: theme.spacing(2),
  },
}));

type SearchBarProps = {
  onSubmit: Function,
  optionsToFilter: IFilter[],
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit, optionsToFilter }): ReactElement => {
  const classes = useStyles();

  const [search, setSearch] = useState<string | MaterialUiPickersDate>("");
  const [date, setDate] = useState<Date | null>(null);
  const [enableInputDate, setEnableInputDate] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<string>("default");
  const [displayValidation, setDisplayValidation] = useState<boolean>(false);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (filterBy === 'default') {
      setDisplayValidation(true);

      return;
    }

    onSubmit({
      value: search,
      filterBy,
    }, event);
  }

  const handleResetFilters = (): void => {
    setFilterBy('default');
    setSearch('');
    setDate(null);
    setEnableInputDate(false);
    onSubmit(search, undefined, true);
  }

  const handleDateChange = (date: MaterialUiPickersDate): void => {
    const selectedDate = moment(date);

    if (selectedDate.isValid()) {
      setSearch(selectedDate.format('YYYY/MM/D'));
      setDate(date);
    }
  }

  const handleSetFilterBy = (event: any): void => {
    setSearch('');
    setDate(null);
    const selectedValue = event.target.value;
    setFilterBy(selectedValue);

    const filterIsForDate = optionsToFilter.filter((option: IFilter) => option.value === selectedValue && option.forDate === true);
    if (filterIsForDate.length) {
      setEnableInputDate(true);
    } else {
      setEnableInputDate(false);
    }
  }

  const displaySearchField = (): ReactElement => {
    if (enableInputDate) {
      return <MuiPickersUtilsProvider
        utils={DateFnsUtils}
        locale={esLocale}
      >
        <KeyboardDatePicker
          id='date-start'
          value={date}
          label='Fecha'
          format='dd/MM/yyyy'
          onChange={handleDateChange}
          className={classes.datePicker}
          autoComplete='off'
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    }

    return <TextField
      value={search}
      onChange={(event) => setSearch(event?.target.value)}
      variant="outlined"
      id="search"
      label="Buscar"
      name="search"
      autoComplete="off"
      style={{ flexGrow: .6 }}
    />
  }

  return (
    <form className={classes.root} onSubmit={handleSearchSubmit}>
      {
        displayValidation &&
        <SnackBar
          message="Por favor rellene todos los campos para filtrar"
          severity="info"
          onDismiss={() => setDisplayValidation(false)}
        />
      }

      <Select
        name="filterBy"
        value={filterBy}
        onChange={handleSetFilterBy}
      >
        <MenuItem value="default">
          <em>Filtrar por:</em>
        </MenuItem>

        {
          optionsToFilter
            .map((option: IFilter) => (
              <MenuItem
                key={option.id}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))
        }
      </Select>

      {displaySearchField()}

      <Button
        color="secondary"
        variant="outlined"
        onClick={() => handleResetFilters()}
        className={classes.button}
      >
        Borrar filtros
      </Button>

      <Button
        type="submit"
        variant="outlined"
        className={classes.button}
      >
        Filtrar
      </Button>
    </form >
  )
}

export default SearchBar;
