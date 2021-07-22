interface IOrder {
  _id?: string;
  date: Date;
  total: number;
  status: string;
  shipping: string;
  authorization: string;
}

export default IOrder;
