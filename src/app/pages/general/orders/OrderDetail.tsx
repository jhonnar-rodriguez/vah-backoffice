import { FC, useEffect, ReactElement, useCallback } from "react";
import { Box, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../../../store";
import { startGetOrderAction } from "../../../../store/actions/general/order/OrderAction";
import SnackBar from "../../../components/snackBar/SnackBar";
import { moment } from "../../../../config";
import { GeneralHelper, AddressHelper } from "../../../helpers";

interface RouteParam {
  orderId: string,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(2),
  },
}));

const OrderDetail: FC = (): ReactElement => {
  const classes = useStyles();
  const { orderId } = useParams<RouteParam>();
  const dispatch = useDispatch();

  const { orderReducer, httpRequestReducer } = useSelector((state: AppState) => state);
  const { orderToDisplay } = orderReducer;
  const { isLoading } = httpRequestReducer;

  const getOrderDetail = useCallback(
    () => {
      const dispatcher = () => dispatch(startGetOrderAction(orderId));
      dispatcher();
    },
    [orderId, dispatch],
  );

  useEffect(() => {
    getOrderDetail();
  }, [getOrderDetail]);

  const orderNotFound = (): ReactElement => {
    if (!isLoading && orderToDisplay._id.length === 0) {
      return <SnackBar severity="error" message="La orden solicitada no pudo sido encontrada" />
    }

    return <></>
  }

  return (
    <>
      {
        !isLoading &&
        orderToDisplay._id.length > 0 &&
        <Paper className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                component="h2"
                variant="h6"
                gutterBottom
              >
                Detalle de pedido #{orderToDisplay._id} - {moment(orderToDisplay.createdAt).format("LL")}
              </Typography>
            </Grid>

            <Grid container>
              <Grid item xs={12}>
                <Typography component="div">
                  <Box textAlign="justify" m={1}>
                    <Box fontWeight="fontWeightBold">
                      Cliente:
                    </Box>
                    {GeneralHelper.getFullNameFromCustomer(orderToDisplay.customer)}
                    <Typography>
                      Teléfono: <span>{orderToDisplay.customer.mobile}</span>
                    </Typography>
                  </Box>

                  <Box textAlign="justify" m={1}>
                    <Box fontWeight="fontWeightBold">
                      Estado del pedido:
                    </Box>
                    {GeneralHelper.getStatusInSpanish(orderToDisplay.status)}
                  </Box>

                  <Box textAlign="justify" m={1}>
                    <Box fontWeight="fontWeightBold">
                      Dirección de entrega:
                    </Box>
                    {AddressHelper.getDescription(orderToDisplay.address)}
                    <Typography>
                      Recibe: <span>{AddressHelper.getName(orderToDisplay.address)}</span>
                    </Typography>
                  </Box>
                </Typography>
              </Grid>
            </Grid>

          </Grid>
        </Paper>
      }

      {orderNotFound()}
    </>
  )
}

export default OrderDetail;
