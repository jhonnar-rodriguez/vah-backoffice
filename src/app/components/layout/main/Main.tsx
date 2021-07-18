import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';
import Copyright from './partials/Copyright';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../store';
import SnackBar from '../../snackBar/SnackBar';
import { startResetStateAction } from '../../../../store/actions/httpRequest/HttpRequestActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Main: FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { success } = useSelector((state: AppState) => state.httpRequestReducer)

  const [open, setOpen] = useState(true);
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const toggleSideByDevice = useCallback(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    toggleSideByDevice();
  }, [toggleSideByDevice]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const resetSuccessMessage = () => {
    const dispatcher = () => dispatch(startResetStateAction());
    dispatcher();
  };

  const handleSuccessMessages = (): ReactElement => {
    return typeof success !== 'undefined' &&
      success.message.length > 0 ?
      <SnackBar
        message={success.message}
        onDismiss={resetSuccessMessage}
      /> :
      <></>
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />

      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {children}
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>

          {handleSuccessMessages()}
        </Container>
      </main>
    </div>
  );
}

export default Main;
