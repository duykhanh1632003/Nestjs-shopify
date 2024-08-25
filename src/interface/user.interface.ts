

export interface IUser {
    _id: string,
    username: string,
    email: string,
    name: string,
    phone: string,
    createdAt: Date
}

export type IUSerPreview = Pick<IUser, '_id' | 'email' | 'name' | 'phone' | 'username'>;

export interface IUserSession {
  id: string;
}
