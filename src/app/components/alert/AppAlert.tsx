import { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

type AppAlertProps = {
  message: string,
  severity?: "error" | "info" | "success" | "warning",
}

const AppAlert: FC<AppAlertProps> = ({ message, severity = "success" }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={severity}>
        {message}
      </Alert>
    </div>
  );
}

export default AppAlert;
