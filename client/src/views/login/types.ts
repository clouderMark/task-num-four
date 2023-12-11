export enum EName {
  NAME = 'userName',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface IDefaultValid {
  [EName.NAME]: null | boolean;
  [EName.EMAIL]: null | boolean;
  [EName.PASSWORD]: null | boolean;
}
