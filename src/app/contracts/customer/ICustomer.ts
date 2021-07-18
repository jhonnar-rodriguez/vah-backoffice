interface ICustomer {
  _id: string,
  name: string,
  code: string,
  email: string,
  mobile: string,
  document: string,
  surname: string,
  documentType: IDocumentType,
}

export interface IDocumentType {
  name: string,
  value: string,
  pattern: string,
};

export default ICustomer;
