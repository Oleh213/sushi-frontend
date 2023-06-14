export class User{
  public userRole: UserRole = UserRole.User;
  public userName: string = '';
}
export enum UserRole{
  Admin,
  User,
  Manager
}

