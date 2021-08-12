import IRole from "../../../../../contracts/security/role/IRole";
import IUserTableColumns from "../../../../../contracts/security/user/table/IUserTableColumns";
import { GeneralHelper } from "../../../../../helpers";

const UserTableColumns: IUserTableColumns[] = [
  {
    id: 'name',
    label: 'Nombre',
    minWidth: 170,
    generateLink: true,
  },
  {
    id: 'lastname',
    label: 'Apellido',
    minWidth: 150,
    format: (value: string) => GeneralHelper.strLimit(value, 20),
  },
  {
    id: 'username',
    label: 'Nombre de Usuario',
    format: (value: string) => GeneralHelper.strLimit(value, 20),
  },
  {
    id: 'role',
    label: 'Rol',
    minWidth: 170,
    format: (value: IRole) => value !== null && value.hasOwnProperty("name") ? GeneralHelper.strLimit(value.name).toUpperCase() : "S/I",
  },
  {
    id: 'email',
    label: 'Correo Electrónico',
    minWidth: 170,
    format: (value: string) => GeneralHelper.strLimit(value, 20),
  },
  {
    id: 'active',
    label: '¿Activo?',
    minWidth: 50,
    format: (value: boolean) => value ? "Si" : "No",
  },
  {
    id: 'actions',
    label: 'Acciones',
    minWidth: 50,
  },
];

export default UserTableColumns;
