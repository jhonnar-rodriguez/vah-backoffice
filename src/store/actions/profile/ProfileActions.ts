import { Dispatch } from 'redux';
import IHttpRequestHandler from '../../../app/contracts/httpRequest/IHttpRequest';
import IChangeUserPassword from '../../../app/contracts/security/user/IChangeUserPassword';
import { HttpHelper } from '../../../app/helpers';
import ProfileService from '../../../app/services/profile/ProfileService';
import { ChangePasswordAction } from '../../types/profile/ProfileTypes';
import { startLogoutAction } from '../auth/AuthActions';
import { setFinishedRequestDispatcher, setRunningRequestDispatcher, startResetStateAction } from '../httpRequest/HttpRequestActions';

export const changePasswordDispatcher = (): ChangePasswordAction => ({
  type: 'CHANGE_PASSWORD',
});

export const startChangePasswordAction = (user: IChangeUserPassword) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(setRunningRequestDispatcher());

    let requestFinishedPayload: IHttpRequestHandler = {
      isLoading: false,
    };

    try {
      const response = await ProfileService.changePassword(user);

      let message = 'Ha ocurrido un error al realizar la petición, por favor intente de nuevo.';
      let statusCode = 422;
      let statusText = 'Error';
      let responseKey = 'success';

      if (response.status === 'OK') {
        message = "La contraseña se ha actualizado satisfactoriamente.";
        statusCode = 200;
        statusText = "Actualizado";
      }

      requestFinishedPayload = {
        ...requestFinishedPayload,
        [responseKey]: {
          message,
          statusCode,
          statusText,
        }
      }

      dispatch(changePasswordDispatcher());
      dispatch(setFinishedRequestDispatcher(requestFinishedPayload));

      setTimeout(() => {
        dispatch(startLogoutAction());
        dispatch(startResetStateAction());
      }, 1000);
    } catch ({ response }) {
      dispatch(setFinishedRequestDispatcher(HttpHelper.formatRequestFinishedResponse(response)));
    }
  }
}
