import { useSelector } from "react-redux";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from "@material-ui/core";
import { AppState } from '../../../../store';
import ApplicationTable from "../../../components/table/ApplicationTable";
import useLoadOrders from "../../../hooks/general/orders/useLoadOrders";
import OrderTableColumns from "./partials/OrderTableColumns";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "75vh",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

const OrderList = () => {
  const classes = useStyles();

  const { list: orders } = useSelector((state: AppState) => state.orderReducer);

  useLoadOrders();

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.buttonContainer}>
          <Typography variant="h4" style={{ padding: "5px" }}>
            Listado de Pedidos
          </Typography>
        </div>

        <ApplicationTable
          columns={OrderTableColumns}
          elements={orders}
        />
      </Paper>
    </>
  );
};

export default OrderList;
