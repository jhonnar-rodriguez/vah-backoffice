import { FC, useEffect, ReactElement, useCallback } from "react";
import { Box, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState } from "../../../../store";
import { startGetOrderAction } from "../../../../store/actions/general/order/OrderAction";
import SnackBar from "../../../components/snackBar/SnackBar";
import { moment } from "../../../../config";
import { GeneralHelper, AddressHelper } from "../../../helpers";
import MapContainer from "../../../components/map/MapContainer";
import OrderProductsList from "./partials/OrderProductsList";

interface RouteParam {
  orderId: string,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    padding: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
}));

const OrderDetail: FC = (): ReactElement => {
  const classes = useStyles();
  const { orderId } = useParams<RouteParam>();
  const dispatch = useDispatch();

  const { orderReducer, httpRequestReducer } = useSelector((state: AppState) => state);
  const { orderToDisplay } = orderReducer;
  const { cart: { products, total: cartTotal, totalDiscount: cartTotalDiscount } } = orderToDisplay;
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

  const renderAddressInMap = () => {
    if (orderToDisplay.shipping !== null && typeof orderToDisplay.shipping.coordinates !== "undefined" &&
      Math.abs(orderToDisplay.shipping.coordinates?.latitude || 0) > 0) {
      return <MapContainer
        label={orderToDisplay.shipping.addressName}
        coords={orderToDisplay.shipping.coordinates}
      />
    }

    return <></>
  }

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

                    <div className={classes.marginLeft}>
                      {GeneralHelper.getFullNameFromCustomer(orderToDisplay.customer)}
                      <Typography>
                        Cédula de Identidad: {GeneralHelper.getDNIForCustomer(orderToDisplay.customer)}
                      </Typography>

                      <Typography>
                        Teléfono: {orderToDisplay.customer.mobile || 'S/I'}
                      </Typography>

                      <Typography>
                        Correo: {orderToDisplay.customer.email || 'S/I'}
                      </Typography>

                      <Typography>
                        Código: {orderToDisplay.customer.code || 'S/I'}
                      </Typography>
                    </div>
                  </Box>

                  <Box textAlign="justify" m={1}>
                    <Box fontWeight="fontWeightBold">
                      Estado del pedido:
                    </Box>
                    <div className={classes.marginLeft}>
                      {GeneralHelper.getStatusInSpanish(orderToDisplay.status)}

                      <Typography>
                        Actualizada el: {moment(orderToDisplay.updatedAt).format("LL")}
                      </Typography>
                    </div>
                  </Box>

                  <Box textAlign="justify" m={1}>
                    <Box fontWeight="fontWeightBold">
                      Productos:
                    </Box>

                    <OrderProductsList
                      products={products}
                      cartTotal={cartTotal}
                      cartTotalDiscount={cartTotalDiscount}
                    />
                  </Box>

                  <Box textAlign="justify" m={1}>
                    <Box fontWeight="fontWeightBold">
                      Dirección de facturación:
                    </Box>
                    <div className={classes.marginLeft}>
                      {AddressHelper.getDescription(orderToDisplay.shipping)}
                    </div>
                  </Box>

                  <Box textAlign="justify" m={1}>
                    <Box fontWeight="fontWeightBold">
                      Dirección de entrega:
                    </Box>
                    <div className={classes.marginLeft}>
                      {AddressHelper.getDescription(orderToDisplay.address)}
                      <Typography>
                        Recibe: {AddressHelper.getName(orderToDisplay.address)}
                      </Typography>

                      {renderAddressInMap()}
                    </div>
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
