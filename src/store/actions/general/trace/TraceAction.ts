import { Dispatch } from 'redux';
import ITrace from '../../../../app/contracts/general/trace/ITrace';
import { HttpHelper } from '../../../../app/helpers';
import TraceService from '../../../../app/services/general/trace/TraceService';
import { GetTracesAction, SetTracesAction, TRACE_ACTION_TYPES } from '../../../types/general/trace/TraceTypes';
import { HTTP_REQUEST_ACTION_TYPES } from '../../../types/httpRequest/HttpRequestTypes';
import { setFinishedRequestDispatcher, setRunningRequestDispatcher } from '../../httpRequest/HttpRequestActions';

export const getTracesDispatcher = (): GetTracesAction => ({
  type: 'GET_TRACES',
});

export const setTracesDispatcher = (traces: ITrace): SetTracesAction => ({
  type: 'SET_TRACES',
  payload: traces,
});

export const startGetTracesAction = () => {
  return async (dispatch: Dispatch<TRACE_ACTION_TYPES | HTTP_REQUEST_ACTION_TYPES>) => {
    dispatch(getTracesDispatcher());
    dispatch(setRunningRequestDispatcher());

    try {
      const traces = await TraceService.getAll();

      dispatch(setTracesDispatcher(traces));
      dispatch(setFinishedRequestDispatcher(HttpHelper.generateBaseResponse()));
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}
