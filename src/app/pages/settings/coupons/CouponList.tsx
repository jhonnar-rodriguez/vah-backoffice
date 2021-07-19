import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography } from "@material-ui/core";
import { AppState } from '../../../../store';
import ApplicationTable from "../../../components/table/ApplicationTable";
import CouponTableColumns from "./partials/CouponTableColumns";
import ICoupon from "../../../contracts/coupon/ICoupon";
import { couponInitialState } from "../../../data/coupons";
import {
  startRemoveCouponAction,
} from "../../../../store/actions/coupon/CouponActions";
import useLoadCoupons from "../../../hooks/settings/coupons/useLoadCoupons";

const useStyles = makeStyles((theme) => ({
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

const CouponList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { list: coupons } = useSelector((state: AppState) => state.couponReducer)

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [createCoupon, setCreateCoupon] = useState<boolean>(true);
  const [couponToUpdate, setCouponToUpdate] = useState<ICoupon>(couponInitialState);

  const handleDeleteCoupon = (couponId: string) => {
    const dispatcher = () => dispatch(startRemoveCouponAction(couponId));
    dispatcher();
  };

  const handleEditCoupon = (coupon: ICoupon) => {
    setCreateCoupon(false);
    setCouponToUpdate(coupon);
    setOpenForm(true);
  }

  useLoadCoupons();

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.buttonContainer}>
          <Typography variant="h4" style={{ padding: "5px" }}>
            Listado de cupones
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}
            className={classes.button}
          >
            Crear
          </Button>
        </div>

        <ApplicationTable
          columns={CouponTableColumns}
          elements={coupons}
          handleEditAction={handleEditCoupon}
          handleConfirmDeleteAction={handleDeleteCoupon}
        />
      </Paper>
    </>
  );
};

export default CouponList;
