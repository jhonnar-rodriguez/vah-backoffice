interface ICoupon {
  _id: string,
  code: string,
  limit: number,
  endDate: string,
  isFirst: boolean,
  startDate: string,
  description: string,
};

export default ICoupon;
