import ITrace from "../../../../app/contracts/general/trace/ITrace";

export const GET_TRACES = 'GET_TRACES';
export const SET_TRACES = 'SET_TRACES';

export interface GetTracesAction {
  type: typeof GET_TRACES,
};

export interface SetTracesAction {
  type: typeof SET_TRACES,
  payload: ITrace,
};

export type TRACE_ACTION_TYPES = GetTracesAction | SetTracesAction;
