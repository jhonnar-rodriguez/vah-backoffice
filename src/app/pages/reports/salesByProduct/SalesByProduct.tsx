import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Paper, Typography, Button } from "@material-ui/core";
import { AppState } from '../../../../store';
import columns from "./TableColumns";
import ApplicationTable from "../../../components/table/ApplicationTable";
import useLoadReports from "../../../hooks/general/reports/useLoadReports";
import ISaleByProduct from "../../../contracts/report/ISaleByProduct";
import { startDownloadSalesByProductReportAction } from "../../../../store/actions/report/ReportActions";
import SnackBar from "../../../components/snackBar/SnackBar";

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

const SalesByProduct = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { salesByProduct } = useSelector((state: AppState) => state.reportReducer);
  const [displayEmailMessage, setDisplayEmailMessage] = useState<boolean>(false);
  const { loadSalesByProduct } = useLoadReports();

  const handleViewOrderAction = (sale: ISaleByProduct): Window | null => window.open(`/orders/${sale.order}/detail`, '_blank');

  useEffect(() => {
    loadSalesByProduct();
  }, [loadSalesByProduct]);

  const handleDownloadReportAction = (): void => {
    setDisplayEmailMessage(true);
    const dispatcher = () => dispatch(startDownloadSalesByProductReportAction());
    dispatcher();
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.buttonContainer}>
        <Typography variant="h4" style={{ padding: "5px" }}>
          Ventas por producto
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDownloadReportAction()}
          className={classes.button}
        >
          Descargar
        </Button>
      </div>

      <ApplicationTable
        columns={columns}
        elements={salesByProduct}
        handleEditAction={handleViewOrderAction}
      />

      {
        displayEmailMessage &&
        <SnackBar
          message='El reporte será enviado a tu correo electrónico en unos minutos, por favor espera...'
          onDismiss={() => setDisplayEmailMessage(false)}
        />
      }
    </Paper>
  );
};

export default SalesByProduct;
