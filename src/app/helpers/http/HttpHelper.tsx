import IHttpRequest from "../../contracts/httpRequest/IHttpRequest";

interface IErrorResponse {
  data?: {
    status: {
      date: string,
      message: string | object,
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
  private static UNPROCESSABLE_ENTITY_STATUS_CODE = 422;
  private static IP_BLOCKED_ENTITY_STATUS_CODE = 429;

  public static generateBaseResponse(): IHttpRequest {
    return {
      isLoading: false,
    };
  };

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

    let message = '';

    if (statusCode === HttpHelper.UNPROCESSABLE_ENTITY_STATUS_CODE) {
      message = 'No se pudo obtener el mensaje de validación de error, por favor intente de nuevo';

      if (typeof data !== 'undefined' && (typeof data.status.message === 'object' || 'details' in data)) {
        const resultMessages = Object.values(data.status.message);
        if (resultMessages.length) {
          message = typeof resultMessages[0].msg !== 'undefined' ? resultMessages[0].msg : resultMessages[0];
        }
      }
    }
    else if (statusCode === HttpHelper.IP_BLOCKED_ENTITY_STATUS_CODE) {
      message = 'Se ha alcanzado el número máximo de intentos, por favor intente mas tarde';
    } else {
      message = typeof data !== 'undefined' && (data.hasOwnProperty('status') && typeof data.status.message === 'string') ?
        data.status.message :
        'Ha ocurrido un error al procesar la petición.';
    }

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
