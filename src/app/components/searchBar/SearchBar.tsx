import { FC, ReactElement, useState } from "react";
import { Button, makeStyles, TextField, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",

    margin: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
    color: "green",
  },
}));

type SearchBarProps = {
  onSubmit: Function,
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }): ReactElement => {
  const classes = useStyles();

  const [search, setSearch] = useState<string>("");

  return (
    <form className={classes.root} onSubmit={(event) => onSubmit(event, search)}>
      <TextField
        value={search}
        onChange={(event) => setSearch(event?.target.value)}
        variant="outlined"
        id="search"
        label="Buscar"
        name="search"
        autoComplete="off"
        fullWidth
        style={{ width: "80%" }}
      />

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
