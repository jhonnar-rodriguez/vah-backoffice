import { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Paper, Typography, Button } from "@material-ui/core";
import { AppState } from '../../../../store';
import columns from "./TableColumns";
import ApplicationTable from "../../../components/table/ApplicationTable";
import useLoadReports from "../../../hooks/general/reports/useLoadReports";
import ISaleByProduct from "../../../contracts/report/ISaleByProduct";
import SnackBar from "../../../components/snackBar/SnackBar";
import { startDownloadSaleReportByName } from "../../../../store/actions/report/ReportActions";
import ReportsSearchBar from "../../../components/reports/ReportsSearchBar";
import IReportFilter from "../../../contracts/report/filters/IReportFilter";
import { initialFilters, reportFiltersInitialState } from "../../../data/filters";

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

const SalesByCustomer = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loadSalesByCustomer } = useLoadReports();

  const { salesByCustomer, totalItems, nextPage, prevPage } = useSelector((state: AppState) => state.reportReducer);
  const [displayEmailMessage, setDisplayEmailMessage] = useState<boolean>(false);
  const [filtersApplied, setFiltersApplied] = useState<IReportFilter>(reportFiltersInitialState);

  const handleViewOrderAction = (sale: ISaleByProduct): Window | null => window.open(`/orders/${sale.order}/detail`, '_blank');

  useEffect(() => {
    loadSalesByCustomer();
  }, [loadSalesByCustomer]);

  const handleApplyFilters = (filters: IReportFilter): void => {
    loadSalesByCustomer(filters);
    setFiltersApplied(filters);
  }

  const handleDownloadReportAction = (): void => {
    setDisplayEmailMessage(true);
    const dispatcher = () => dispatch(startDownloadSaleReportByName('customer'));
    dispatcher();
  }

  const handlePageChange = (gotForward: boolean | undefined, limit: number): void => {
    loadSalesByCustomer({
      ...filtersApplied,
      page: typeof gotForward === 'undefined' ? 1 : gotForward ? nextPage : prevPage,
      limit,
    });
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.buttonContainer}>
        <Typography variant="h4" style={{ padding: "5px" }}>
          Ventas por cliente
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

      <ReportsSearchBar
        filterBy='customers'
        onSubmit={handleApplyFilters}
      />

      <ApplicationTable
        columns={columns}
        elements={salesByCustomer}
        totalElements={totalItems}
        handlePageChange={handlePageChange}
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

export default SalesByCustomer;
