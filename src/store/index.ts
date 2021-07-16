import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducers from './reducers';
import { AppTypes } from './types';

const initialState = {};

export type AppState = ReturnType<typeof rootReducers>;

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppTypes>),
  )
);

export default store;
