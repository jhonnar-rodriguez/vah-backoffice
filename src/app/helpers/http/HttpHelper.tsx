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

class HttpHelper {
  public static formatRequestFinishedResponse(response: IErrorResponse): IHttpRequest {
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
      data.status.message :
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

  public static generateBaseResponse(): IHttpRequest {
    return {
      isLoading: false,
    };
  };

  public static generateSuccessResponse(startMessage: string = "El registro"): IHttpRequest {
    return {
      isLoading: false,
      success: {
        message: `${startMessage} ha sido creado satisfactoriamente`,
        statusCode: 201,
        statusText: "Created",
      },
    };
  };
}

export default HttpHelper;
