import IAllowedClientTableColumns from "../../../../../contracts/security/allowedClient/table/IAllowedClientTableColumns";
import { GeneralHelper } from "../../../../../helpers";

const AllowedClientTableColumns: IAllowedClientTableColumns[] = [
  {
    id: 'name',
    label: 'Nombre',
    minWidth: 170,
    generateLink: true,
  },
  {
    id: 'secret',
    label: 'Llave Secreta',
    minWidth: 150,
    format: (value: string) => GeneralHelper.strLimit(value, 20),
  },
  {
    id: 'provider',
    label: 'Proveedor',
  },
  {
    id: 'url',
    label: 'Url',
    minWidth: 170,
    format: (value: string) => GeneralHelper.strLimit(value, 20),
  },
  {
    id: 'notificationUrl',
    label: 'Url de Notificación',
    minWidth: 170,
    format: (value: string) => GeneralHelper.strLimit(value, 20),
  },
  {
    id: 'revoked',
    label: '¿Revocado?',
    minWidth: 50,
    format: (value: boolean) => value ? "Si" : "No",
  },
  {
    id: 'actions',
    label: 'Acciones',
    minWidth: 50,
  },
];

export default AllowedClientTableColumns;
