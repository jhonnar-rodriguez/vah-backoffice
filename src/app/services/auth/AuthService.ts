import httpClient from '../../../config/axios';
import IAuth from '../../contracts/auth/IAuth';
import ICredentials from '../../contracts/auth/ICredentials';

class AuthService {
  public static async authenticate(credentials: ICredentials): Promise<IAuth> {
    const xhr = await httpClient.post('/login', { ...credentials }).then(({ data }) => data);

    return xhr;
  }

  public static async logout(): Promise<void> {
    await httpClient.get('/logout');
  }
}

export default AuthService;
