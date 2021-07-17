import { FC } from "react";
import { List, ListItem, makeStyles, Theme } from "@material-ui/core";
import { FieldErrors, FieldError } from "react-hook-form";

const useStyles = makeStyles((theme: Theme) => ({
  listContainer: {
    padding: theme.spacing(.5),
  },
  listItem: {
    color: "red",
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

type FormErrorsProps = {
  errors: FieldErrors,
};

const FormErrors: FC<FormErrorsProps> = ({ errors }) => {
  const classes = useStyles();

  return (
    <List className={classes.listContainer}>
      {
        Object
          .values(errors).length ?
          Object
            .values(errors)
            .map((error: FieldError, i) =>
              <ListItem
                key={i}
                className={classes.listItem}
              >
                {error.message}
              </ListItem>
            ) :
          ''
      }
    </List>
  )
};

export default FormErrors;
