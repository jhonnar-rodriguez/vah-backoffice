import IHttpRequest from "../../contracts/httpRequest/IHttpRequest";

interface IErrorResponse {
  data?: {
    status: {
      date: string,
      message: string,
      reason: string,
      status: string,
    },
  },
  status: number,
  statusText: string,
}

interface ISuccessResponse {
  action?: string,
  statusCode?: number,
  startMessage?: string,
}

class HttpHelper {
  public static generateBaseResponse(): IHttpRequest {
    return {
      isLoading: false,
    };
  };

  public static formatRequestFinishedResponse(response: any): IHttpRequest {
    if (typeof response === 'undefined') {
      return {
        isLoading: false,
        error: {
          message: 'Ha ocurrido un error al procesar la petición, por favor intenta de nuevo más tarde',
          statusText: 'Error de servidor',
          statusCode: 500,
        }
      }

    }
    const { data, status: statusCode, statusText } = response;

    const message = typeof data !== 'undefined' && data.hasOwnProperty('status') ?
      'Ha ocurrido un error al procesar la petición, por favor intenta de nuevo más tarde' :
      'Ha ocurrido un error al procesar la petición, por favor intenta de nuevo más tarde';

    return {
      isLoading: false,
      error: {
        message,
        statusText,
        statusCode,
      }
    }
  };

  public static generateSuccessResponse(successResponse: ISuccessResponse): IHttpRequest {
    const { action = "creado", statusCode = 200, startMessage = "El registro" } = successResponse;

    return {
      isLoading: false,
      success: {
        message: `${startMessage} ha sido ${action} satisfactoriamente`,
        statusCode,
        statusText: action,
      },
    };
  };
}

export default HttpHelper;
