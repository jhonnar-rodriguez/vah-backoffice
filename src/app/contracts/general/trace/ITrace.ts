export interface InformationByTrace {
  name: string,
  quantity: number,
}

interface ITrace {
  bestSellers: InformationByTrace[],
  productsMostSeen: InformationByTrace[],
  categoriesMostSeen: InformationByTrace[],
};

export default ITrace;
