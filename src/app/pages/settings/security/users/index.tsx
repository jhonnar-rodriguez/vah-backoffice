import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, Typography } from "@material-ui/core";
import ApplicationTable from "../../../../components/table/ApplicationTable";
import IUser from "../../../../contracts/security/user/IUser";
import { changeUserPasswordInitialState, usersInitialState } from "../../../../data/security/user";
import {
  startChangeUserPasswordAction,
  startCreateUserAction,
  startRemoveUserAction,
  startUpdateUserAction,
} from "../../../../../store/actions/settings/security/user/UserActions";
import UserForm from "./partials/UserForm";
import UserTableColumns from "./partials/UserTableColumns";
import { AppState } from "../../../../../store";
import useLoadUsers from "../../../../hooks/settings/security/users/useLoadUsers";
import ChangeUserPasswordForm from "./partials/ChangeUserPasswordForm";
import IChangeUserPassword from "../../../../contracts/security/user/IChangeUserPassword";

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
  const [loadUsers] = useLoadUsers();

  const { list: users, totalItems, nextPage, prevPage } = useSelector((state: AppState) => state.userReducer)

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [createUser, setCreateUser] = useState<boolean>(true);
  const [userToUpdate, setUserToUpdate] = useState<IUser>(usersInitialState);

  const [changeUserPassword, setChangeUserPassword] = useState<boolean>(false);
  const [userToChangePassword, setUserToChangePassword] = useState<IChangeUserPassword>(changeUserPasswordInitialState);

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

  const handleChangePasswordClick = (user: IChangeUserPassword) => {
    setUserToChangePassword({
      _id: user._id,
      name: user.name,
      password: '',
      password_confirmation: '',
    });

    setChangeUserPassword(true);
  }

  const handlePageChange = (gotForward: boolean | undefined, limit: number): void => {
    loadUsers({
      value: '',
      filterBy: '',
      page: typeof gotForward === 'undefined' ? 1 : gotForward ? nextPage : prevPage,
      limit,
    });
  }

  const handleChangePasswordClose = (user?: IChangeUserPassword) => {
    setUserToChangePassword(changeUserPasswordInitialState);

    if (typeof user === 'undefined' || typeof user._id === 'undefined' || user._id.length === 0 || typeof user.password === 'undefined' || user.password.length === 0) {
      setChangeUserPassword(false);
      return;
    }

    let dispatcher = () => dispatch(startChangeUserPasswordAction(user));

    dispatcher();
    setChangeUserPassword(false);
  };

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
          totalElements={totalItems}
          handlePageChange={handlePageChange}
          handleEditAction={handleEditUser}
          handleConfirmDeleteAction={handleDeleteUser}
          handleChangePasswordAction={handleChangePasswordClick}
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

      {
        changeUserPassword &&
        <ChangeUserPasswordForm
          open={true}
          action="Actualizar"
          handleClose={handleChangePasswordClose}
          elementToUpdate={userToChangePassword}
        />
      }
    </>
  );
};

export default UserList;
