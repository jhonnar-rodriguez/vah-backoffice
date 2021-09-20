import IUser from "../../contracts/security/user/IUser";

class LocalStorageHelper {

  public static setToken(token: string): void {
    localStorage.setItem('token', btoa(token));
  }

  public static setUser(user: IUser): void {
    const userData = JSON.stringify({
      _id: user._id,
      name: user.name,
      role: typeof user.role === "string" ? user.role : user.role?.name || 'agent',
      email: user.email,
      username: user.username,
    });

    localStorage.setItem('user', btoa(userData));
  }

  public static getToken(): string | null {
    return this.getItem('token');
  }

  public static getAuthenticatedUser(): IUser | null {
    return this.getItem('user', 'object');
  }

  public static removeAuthenticationKeys(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public static getItem(itemName: string, type: string = 'string'): any {
    const itemValue = localStorage.getItem(itemName);

    return itemValue !== null ? type === 'string' ? atob(itemValue) : JSON.parse(atob(itemValue)) : null;
  }

}

export default LocalStorageHelper;
