interface ISaleByCustomer {
  order: string,
  paymentMethod: string,
  id: string,
  code: string,
  name: string,
  surname: string,
  mobile: string,
  documentType: string,
  document: string,
  total: number,
  totalDiscount: number,
  createAt: string,
}

export default ISaleByCustomer;
