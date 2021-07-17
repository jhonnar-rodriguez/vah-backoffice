import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography } from "@material-ui/core";
import { AppState } from '../../../../store';
import columns from "./TableColumns";
import ApplicationTable from "../../../components/table/ApplicationTable";
import useLoadCustomers from "../../../hooks/settings/customers/useLoadCustomers";
import ICustomer from "../../../contracts/customer/ICustomer";
import { customerInitialState } from "../../../data/customers";
import CustomerForm from "./partials/CustomerForm";
import { startCreateCustomerAction } from "../../../../store/actions/customer/CustomerActions";

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

const CustomerList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { customerReducer } = useSelector((state: AppState) => state)
  const { list: customers } = customerReducer;

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [createCustomer, setCreateCustomer] = useState<boolean>(true);
  const [customerToUpdate, setCustomerToUpdate] = useState<ICustomer>(customerInitialState);

  const handleFormClose = (customer?: ICustomer) => {
    setCreateCustomer(true);
    setCustomerToUpdate(customerInitialState);

    if (typeof customer?.name === "undefined") {
      setOpenForm(false);
      return;
    }

    let dispatcher = () => dispatch(startCreateCustomerAction(customer));

    dispatcher();
    setOpenForm(false);
  };

  const handleDeleteCustomer = (customerId: string) => {
  };

  const handleEditCustomer = (customer: ICustomer) => {
    setCreateCustomer(false);
    setCustomerToUpdate(customer);
    setOpenForm(true);
  }

  useLoadCustomers();

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.buttonContainer}>
          <Typography variant="h4" style={{ padding: "5px" }}>
            Listado de clientes
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
          columns={columns}
          elements={customers}
          handleEditAction={handleEditCustomer}
          handleConfirmDeleteAction={handleDeleteCustomer}
        />
      </Paper>

      {
        openForm &&
        <CustomerForm
          open={true}
          action={createCustomer ? "Crear" : "Actualizar"}
          handleClose={handleFormClose}
          elementToUpdate={customerToUpdate}
        />
      }
    </>
  );
};

export default CustomerList;
