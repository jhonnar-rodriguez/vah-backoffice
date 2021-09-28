interface IPromotion {
  _id: string;
  sku: string | string[];
  value: number;
  segment: string;
  description?: string;
};

export default IPromotion;
