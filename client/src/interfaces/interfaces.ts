export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

interface IVisited {
  visited: Date,
}

interface IStatus {
  blocked: boolean;
}

interface IEmail {
  email: string;
  id?: string;
}

export interface ILogin extends IEmail {
  password: string,
}

export interface IUser extends IEmail {
  name: string,
  lastVisit: IVisited,
  status: IStatus,
}

export interface IObject {
  [key: string]: string;
}
