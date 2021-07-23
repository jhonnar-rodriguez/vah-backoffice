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
    value: "TYPE_PPN",
    pattern: "^[a-zA-Z0-9_]{4,16}$",
  },
];
