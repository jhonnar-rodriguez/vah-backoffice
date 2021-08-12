import { FC, FormEvent, ReactElement, useState } from "react";
import { Button, makeStyles, MenuItem, Select, TextField, Theme } from "@material-ui/core";
import IFilter from "../../contracts/filter/IFilter";
import SnackBar from "../snackBar/SnackBar";

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
}));

type SearchBarProps = {
  onSubmit: Function,
  optionsToFilter: IFilter[],
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit, optionsToFilter }): ReactElement => {
  const classes = useStyles();

  const [search, setSearch] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("default");
  const [displayValidation, setDisplayValidation] = useState<boolean>(false);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (filterBy === "default") {
      setDisplayValidation(true);

      return;
    }

    onSubmit({
      value: search,
      filterBy,
    }, event);
  }

  const handleResetFilters = (): void => {
    setFilterBy("default");
    setSearch("");
    onSubmit(search, undefined, true);
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
        onChange={(event: any) => setFilterBy(event.target.value)}
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

      <TextField
        value={search}
        onChange={(event) => setSearch(event?.target.value)}
        variant="outlined"
        id="search"
        label="Buscar"
        name="search"
        autoComplete="off"
        style={{ flexGrow: .6 }}
      />

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
    </form>
  )
}

export default SearchBar;
