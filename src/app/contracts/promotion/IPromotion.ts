interface IPromotion {
  _id: string;
  segment: string;
  details: string | string[];
  description?: string;
};

export default IPromotion;
