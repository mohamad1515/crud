export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
  };
  phone: string;
}

export interface IAddUser {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
  };
  phone: string;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}

export interface IEditUser {
  id?: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
  };
  phone: string;
}
