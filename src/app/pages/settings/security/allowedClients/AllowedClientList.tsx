import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, Typography } from "@material-ui/core";
import ApplicationTable from "../../../../components/table/ApplicationTable";
import AllowedClientTableColumns from "./partials/AllowedClientTableColumns";
import { AppState } from "../../../../../store";
import IAllowedClient from "../../../../contracts/security/allowedClient/IAllowedClient";
import { allowedClientsInitialState } from "../../../../data/security/allowedClient";
import useLoadAllowedClients from "../../../../hooks/settings/security/allowedClients/useLoadAllowedClients";
import {
  startCreateClientAction,
  startRemoveClientAction,
  startUpdateClientAction,
} from "../../../../../store/actions/allowedClient/AllowedClientActions";
import AllowedClientForm from "./partials/AllowedClientForm";

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

const AllowedClientList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loadAllowedClients] = useLoadAllowedClients();

  const { list: allowedClients, totalItems, nextPage, prevPage } = useSelector((state: AppState) => state.allowedClientReducer)

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [createAllowedClient, setCreateAllowedClient] = useState<boolean>(true);
  const [allowedClientToUpdate, setAllowedClientToUpdate] = useState<IAllowedClient>(allowedClientsInitialState);

  const handleFormClose = (allowedClient?: IAllowedClient) => {
    setCreateAllowedClient(true);
    setAllowedClientToUpdate(allowedClientsInitialState);

    if (typeof allowedClient?.name === "undefined") {
      setOpenForm(false);
      return;
    }

    let dispatcher = () => dispatch(startCreateClientAction(allowedClient));

    if (!createAllowedClient) {
      dispatcher = () => dispatch(startUpdateClientAction(allowedClient));
    }

    dispatcher();
    setOpenForm(false);
  };

  const handleDeleteAllowedClient = (allowedClientId: string) => {
    const dispatcher = () => dispatch(startRemoveClientAction(allowedClientId));
    dispatcher();
  };

  const handleEditAllowedClient = (allowedClient: IAllowedClient) => {
    setCreateAllowedClient(false);
    setAllowedClientToUpdate(allowedClient);
    setOpenForm(true);
  }

  const handlePageChange = (gotForward: boolean | undefined, limit: number): void => {
    loadAllowedClients({
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
            Listado de Aplicaciones Permitidas
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
          columns={AllowedClientTableColumns}
          elements={allowedClients}
          totalElements={totalItems}
          handlePageChange={handlePageChange}
          handleEditAction={handleEditAllowedClient}
          handleConfirmDeleteAction={handleDeleteAllowedClient}
        />
      </Paper>

      {
        openForm &&
        <AllowedClientForm
          open={true}
          action={createAllowedClient ? "Crear" : "Actualizar"}
          handleClose={handleFormClose}
          elementToUpdate={allowedClientToUpdate}
        />
      }
    </>
  );
};

export default AllowedClientList;
