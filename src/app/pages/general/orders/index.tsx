import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography } from "@material-ui/core";
import { AppState } from '../../../../store';
import ApplicationTable from "../../../components/table/ApplicationTable";
import useLoadOrders from "../../../hooks/general/orders/useLoadOrders";
import OrderTableColumns from "./partials/OrderTableColumns";
import { useState } from "react";
import { orderStatusInitialState } from "../../../data/general/orders";
import ChangeOrderStatusForm from "./partials/ChangeOrderStatusForm";
import IOrderChangeStatus from "../../../contracts/general/order/IOrderChangeStatus";
import IOrder from "../../../contracts/general/order/IOrder";
import { startUpdateOrderAction } from "../../../../store/actions/general/order/OrderAction";
import { useHistory } from "react-router-dom";

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
  const dispatch = useDispatch();
  const history = useHistory();

  const { list: orders } = useSelector((state: AppState) => state.orderReducer);

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [orderToUpdate, setOrderToUpdate] = useState<IOrderChangeStatus>(orderStatusInitialState);

  const handleFormClose = (order?: IOrderChangeStatus) => {
    setOrderToUpdate(orderStatusInitialState);
    setOpenForm(false);

    if (typeof order?._id === "undefined") {
      setOpenForm(false);
      return;
    }

    const dispatcher = () => dispatch(startUpdateOrderAction(order));

    dispatcher();
    setOpenForm(false);
  };

  const handleEditOrderAction = (order: IOrder) => {
    const orderToUpdate: IOrderChangeStatus = {
      _id: order._id,
      status: " ",
      description: "",
    }

    setOrderToUpdate(orderToUpdate);
    setOpenForm(true);
  }

  const handleViewOrderAction = (order: IOrder) => {
    history.push(`/orders/${order._id}/detail`);
  }

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
          handleViewAction={handleViewOrderAction}
          handleEditAction={handleEditOrderAction}
        />

        {
          openForm &&
          <ChangeOrderStatusForm
            open={true}
            action="Actualizar"
            handleClose={handleFormClose}
            elementToUpdate={orderToUpdate}
          />
        }
      </Paper>
    </>
  );
};

export default OrderList;
