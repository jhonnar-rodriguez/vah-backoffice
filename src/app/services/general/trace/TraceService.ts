import httpClient from "../../../../config/axios";
import ITrace from "../../../contracts/general/trace/ITrace";
import { tracesMock } from "../../../data/general/traces";
import { USE_MOCK_FOR_TRACES } from "../../../../config/app";

class TraceService {
  public static async getAll(): Promise<ITrace> {
    const xhr = await httpClient
      .get('/trace')
      .then(({ data }) => {
        const useMock = typeof USE_MOCK_FOR_TRACES === 'string' ? USE_MOCK_FOR_TRACES === 'true' : USE_MOCK_FOR_TRACES;
        
        if (useMock) {
          data = tracesMock;
        }

        return {
          bestSellers: data.bestSellers,
          productsMostSeen: data.productsMostSeen,
          categoriesMostSeen: data.categoriesMostSeen,
        };
      });

    return xhr;
  }
}

export default TraceService;
