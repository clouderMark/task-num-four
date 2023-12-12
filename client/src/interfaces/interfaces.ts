export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

interface IDate {
  date: string;
}

interface IBlocked {
  blocked: boolean;
}

interface IEmail {
  email: string;
  _id?: string;
}

export interface ILogin extends IEmail {
  password: string;
}

export interface IUser extends IEmail {
  name: string;
  lastVisit: IDate;
  status: IBlocked;
  createdAt: string;
}

export interface IData {
  id: string;
  name: string;
  createdAt: Date;
  lastVisit: Date;
  status: boolean;
}

export interface IObject {
  [key: string]: string;
}

export interface IDelete {
  acknowledged: boolean;
  deletedCount: number;
}

interface IIds {
  id: string[];
}

export interface IToken {
  token: string;
}

export interface ISignup extends ILogin {
  name: string;
}

export interface IAct extends IToken, IIds {}
