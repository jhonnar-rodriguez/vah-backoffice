import { v4 as uuid } from "uuid";
import ICustomer, { IDocumentType } from "../../contracts/customer/ICustomer";
import IFilter from '../../contracts/filter/IFilter';

export const customerInitialState: ICustomer = {
  _id: "",
  name: "",
  code: "",
  email: "",
  mobile: "",
  document: "",
  surname: "",
  documentType: {
    name: "",
    value: " ",
    pattern: "",
  },
};

export const documentTypes: IDocumentType[] = [
  {
    name: "DNI",
    value: "DNI",
    pattern: "^\\d{8}$",
  },
  {
    name: "RUC",
    value: "RUC",
    pattern: "^\\d{13}$",
  },
  {
    name: "Carné de Extranjería",
    value: "EXT",
    pattern: "^([a-zA-Z]{1,5})?[1-9][0-9]{3,7}$",
  },
  {
    name: "Pasaporte",
    value: "PPN",
    pattern: "^[a-zA-Z0-9_]{4,16}$",
  },
];


export const customersFilterableOptions: IFilter[] = [
  {
    id: uuid(),
    value: "name",
    label: "Nombre",
  },
  {
    id: uuid(),
    value: "surname",
    label: "Apellido",
  },
  {
    id: uuid(),
    value: "code",
    label: "Código",
  },
  {
    id: uuid(),
    value: "mobile",
    label: "Celular",
  },
  {
    id: uuid(),
    value: "email",
    label: "Correo",
  },
  {
    id: uuid(),
    value: "document",
    label: "Documento",
  },
];
