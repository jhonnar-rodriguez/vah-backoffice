import ICustomer, { IDocumentType } from "../../contracts/customer/ICustomer";

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
    value: "dni",
    pattern: "^\\d{8}$",
  },
  {
    name: "RUC",
    value: "ruc",
    pattern: "^\\d{13}$",
  },
  {
    name: "Carné de Extranjería",
    value: "ext",
    pattern: "^([a-zA-Z]{1,5})?[1-9][0-9]{3,7}$",
  },
  {
    name: "Pasaporte",
    value: "ppn",
    pattern: "^[a-zA-Z0-9_]{4,16}$",
  },
];
