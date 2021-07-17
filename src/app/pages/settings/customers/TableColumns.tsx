import ICustomerColumns from "../../../contracts/customer/table/ICustomerColumns";

const columns: ICustomerColumns[] = [
  {
    id: 'name',
    label: 'Nombre',
    minWidth: 170,
    generateLink: true,
  },
  {
    id: 'surname',
    label: 'Apellido',
    minWidth: 100,
  },
  {
    id: 'email',
    label: 'Correo',
    minWidth: 170,
  },
  {
    id: 'documentType',
    label: 'Tipo de Documento',
    minWidth: 170,
  },
  {
    id: 'document',
    label: 'Número de Documento',
    minWidth: 170,
  },
  {
    id: 'actions',
    label: 'Acciones',
    minWidth: 50,
  },
];

export default columns;
