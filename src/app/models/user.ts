export interface User {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
  company: string;
  status: number;
  createDate: Date;
}

export class User implements User {}
