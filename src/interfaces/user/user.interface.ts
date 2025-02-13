import { Role } from '@prisma/client';


export interface User {
  id: number;
  email: string;
  password: string;
  role: Role;
  refresh_token?: string;
  created_at: Date;
  updated_at: Date;
}


