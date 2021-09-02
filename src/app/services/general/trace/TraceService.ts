import httpClient from "../../../../config/axios";
import ITrace from "../../../contracts/general/trace/ITrace";
import { tracesMock } from "../../../data/general/traces";

class TraceService {
  public static async getAll(): Promise<ITrace> {
    const xhr = await httpClient.get('/trace').then(({ data }) => {
      data = tracesMock;

      return {
        bestSellers: data.bestSellers,
        productsMostSeen: data.productsMostSeen,
        categoriesMostSeen: data.productsMostSeen,
      };
    });

    return xhr;
  }
}

export default TraceService;
