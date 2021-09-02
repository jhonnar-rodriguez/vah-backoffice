import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";
import { AppState } from "../../../store";
import useLoadTraces from "../../hooks/general/traces/useLoadTraces";
import CustomChart from "../../components/customChart/CustomChart";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Dashboard = (): ReactElement => {
  const classes = useStyles();
  const traceReducer = useSelector((state: AppState) => state.traceReducer);
  const { bestSellers, categoriesMostSeen, productsMostSeen } = traceReducer;

  useLoadTraces();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <CustomChart
            chartType='doughnut'
            mainLabel='Productos más vendidos'
            traces={bestSellers}
          />
        </Grid>

        <Grid item xs={8}>
          <CustomChart
            chartType='bar'
            mainLabel='Productos más vistos'
            traces={productsMostSeen}
          />
        </Grid>

        <Grid item xs={8}>
          <CustomChart
            chartType='bar'
            mainLabel='Categorías más vistas'
            traces={categoriesMostSeen}
          />
        </Grid>

      </Grid>
    </Paper>
  )
}

export default Dashboard;
