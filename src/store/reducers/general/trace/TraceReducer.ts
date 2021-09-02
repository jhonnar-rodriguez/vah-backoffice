import ITrace from '../../../../app/contracts/general/trace/ITrace';
import { GET_TRACES, SET_TRACES, TRACE_ACTION_TYPES } from '../../../types/general/trace/TraceTypes';

const initialState: ITrace = {
  bestSellers: [],
  productsMostSeen: [],
  categoriesMostSeen: [],
};

const TraceReducer = (state = initialState, action: TRACE_ACTION_TYPES): ITrace => {
  switch (action.type) {
    case GET_TRACES:
      return {
        ...state,
      }

    case SET_TRACES:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state;
  }
}

export default TraceReducer;
