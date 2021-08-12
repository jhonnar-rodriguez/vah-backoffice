import IHttpRequest from '../../../app/contracts/httpRequest/IHttpRequest';
import {
  HTTP_RESET_STATE,
  HTTP_REQUEST_RUNNING,
  HTTP_REQUEST_FINISHED,
  HTTP_REQUEST_ACTION_TYPES,
} from '../../types/httpRequest/HttpRequestTypes';

const initialState: IHttpRequest = {
  isLoading: false,
};

const HttpRequestReducer = (state = initialState, action: HTTP_REQUEST_ACTION_TYPES): IHttpRequest => {
  switch (action.type) {
    case HTTP_REQUEST_RUNNING:
      return {
        ...state,
        isLoading: true,
      }

    case HTTP_REQUEST_FINISHED:
      return {
        ...state,
        ...action.payload,
      }

    case HTTP_RESET_STATE:
      return {
        ...state,
        isLoading: false,
        error: {
          message: '',
          statusCode: 0,
          statusText: '',
        },
        success: {
          message: '',
          statusCode: 0,
          statusText: '',
        },
      }

    default:
      return state;
  }
}

export default HttpRequestReducer;
