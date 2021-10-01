import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, Typography } from "@material-ui/core";
import { AppState } from '../../../../store';
import ApplicationTable from "../../../components/table/ApplicationTable";
import CouponTableColumns from "./partials/CouponTableColumns";
import ICoupon from "../../../contracts/coupon/ICoupon";
import { couponInitialState } from "../../../data/coupons";
import {
  startCreateCouponAction,
  startRemoveCouponAction,
  startUpdateCouponAction,
} from "../../../../store/actions/coupon/CouponActions";
import useLoadCoupons from "../../../hooks/settings/coupons/useLoadCoupons";
import CouponForm from "./partials/CouponForm";

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

const CouponList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loadCoupons] = useLoadCoupons();

  const { list: coupons, totalItems, nextPage, prevPage } = useSelector((state: AppState) => state.couponReducer)

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [createCoupon, setCreateCoupon] = useState<boolean>(true);
  const [couponToUpdate, setCouponToUpdate] = useState<ICoupon>(couponInitialState);

  const handleFormClose = (coupon?: ICoupon) => {
    setCreateCoupon(true);
    setCouponToUpdate(couponInitialState);

    if (typeof coupon?.code === "undefined") {
      setOpenForm(false);
      return;
    }

    let dispatcher = () => dispatch(startCreateCouponAction(coupon));

    if (!createCoupon) {
      dispatcher = () => dispatch(startUpdateCouponAction(coupon));
    }

    dispatcher();
    setOpenForm(false);
  };

  const handleDeleteCoupon = (couponId: string) => {
    const dispatcher = () => dispatch(startRemoveCouponAction(couponId));
    dispatcher();
  };

  const handleEditCoupon = (coupon: ICoupon) => {
    setCreateCoupon(false);
    setCouponToUpdate(coupon);
    setOpenForm(true);
  }

  const handlePageChange = (gotForward: boolean | undefined, limit: number): void => {
    loadCoupons({
      value: '',
      filterBy: '',
      page: typeof gotForward === 'undefined' ? 1 : gotForward ? nextPage : prevPage,
      limit,
    });
  }

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
          totalElements={totalItems}
          handlePageChange={handlePageChange}
          handleEditAction={handleEditCoupon}
          handleConfirmDeleteAction={handleDeleteCoupon}
        />
      </Paper>

      {
        openForm &&
        <CouponForm
          open={true}
          action={createCoupon ? "Crear" : "Actualizar"}
          handleClose={handleFormClose}
          elementToUpdate={couponToUpdate}
        />
      }
    </>
  );
};

export default CouponList;
