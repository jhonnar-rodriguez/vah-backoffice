import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, Typography } from "@material-ui/core";
import ApplicationTable from "../../../../components/table/ApplicationTable";
import IUser from "../../../../contracts/security/user/IUser";
import { usersInitialState } from "../../../../data/security/user";
import { startCreateUserAction, startRemoveUserAction, startUpdateUserAction } from "../../../../../store/actions/settings/security/user/UserActions";
import UserForm from "./partials/UserForm";
import UserTableColumns from "./partials/UserTableColumns";
import { AppState } from "../../../../../store";
import useLoadUsers from "../../../../hooks/settings/security/users/useLoadUsers";

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

const UserList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { list: users } = useSelector((state: AppState) => state.userReducer)

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [createUser, setCreateUser] = useState<boolean>(true);
  const [userToUpdate, setUserToUpdate] = useState<IUser>(usersInitialState);

  const handleFormClose = (user?: IUser) => {
    setUserToUpdate(usersInitialState);

    if (typeof user?.name === "undefined") {
      setCreateUser(true);
      setOpenForm(false);
      return;
    }

    let dispatcher = () => dispatch(startCreateUserAction({
      ...user,
      active: true,
    }));

    if (!createUser) {
      const updatedUser = {
        _id: user?._id,
        name: user?.name,
        lastname: user?.lastname,
        email: user.email,
        mobile: user?.mobile,
        username: user?.username,
        role: user?.role,
        active: true
      };
      dispatcher = () => dispatch(startUpdateUserAction(updatedUser));
    }

    dispatcher();
    setCreateUser(true);
    setOpenForm(false);
  };

  const handleDeleteUser = (userId: string) => {
    const dispatcher = () => dispatch(startRemoveUserAction(userId));
    dispatcher();
  };

  const handleEditUser = (user: IUser) => {
    setCreateUser(false);
    setUserToUpdate(user);
    setOpenForm(true);
  }

  useLoadUsers();

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.buttonContainer}>
          <Typography variant="h4" style={{ padding: "5px" }}>
            Listado de Usuarios
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
          columns={UserTableColumns}
          elements={users}
          handleEditAction={handleEditUser}
          handleConfirmDeleteAction={handleDeleteUser}
        />
      </Paper>

      {
        openForm &&
        <UserForm
          open={true}
          action={createUser ? "Crear" : "Actualizar"}
          handleClose={handleFormClose}
          elementToUpdate={userToUpdate}
        />
      }
    </>
  );
};

export default UserList;
