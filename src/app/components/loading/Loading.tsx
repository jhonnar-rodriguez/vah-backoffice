import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const Loading = () => {
  const classes = useStyles();

  return (
    <Backdrop
      open={true}
      className={classes.backdrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
