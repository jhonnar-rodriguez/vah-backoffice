import { FormEvent, useState } from "react";
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
import { startCreateCustomerAction, startRemoveCustomerAction, startUpdateCustomerAction } from "../../../../store/actions/customer/CustomerActions";
import SearchBar from "../../../components/searchBar/SearchBar";

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
  const [customerToUpdate, setCustomerToUpdate] = useState<any>(customerInitialState);

  const handleFormClose = (customer?: ICustomer) => {
    setCreateCustomer(true);
    setCustomerToUpdate(customerInitialState);

    if (typeof customer?.name === "undefined") {
      setOpenForm(false);
      return;
    }

    let dispatcher = () => dispatch(startCreateCustomerAction(customer));

    if (!createCustomer) {
      dispatcher = () => dispatch(startUpdateCustomerAction(customer));
    }

    dispatcher();
    setOpenForm(false);
  };

  const handleDeleteCustomer = (customerId: string) => {
    const dispatcher = () => dispatch(startRemoveCustomerAction(customerId));
    dispatcher();
  };

  const handleEditCustomer = (customer: ICustomer) => {
    let customerToUpdate = {
      _id: customer._id,
      name: customer.name || "",
      code: customer.code || "",
      email: customer.email || "",
      mobile: customer.mobile || "",
      document: customer.document || "",
      surname: customer.surname || "",
      documentType: typeof customer.documentType !== "undefined" ? String(customer.documentType) : " ",
    };

    setCreateCustomer(false);
    setCustomerToUpdate(customerToUpdate);
    setOpenForm(true);
  }

  const [loadCustomers] = useLoadCustomers();

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>, search: string): void => {
    event.preventDefault();

    loadCustomers(search);
  }

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

        <SearchBar onSubmit={handleSearchSubmit} />

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
