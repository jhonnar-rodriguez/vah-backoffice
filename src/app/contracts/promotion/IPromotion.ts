interface IPromotion {
  _id: string,
  segment: string,
  sku: string[],
  value: number,
  description?: string,
};

export default IPromotion;
