export interface LoginResponse {
  user: {
    id: number;
    role: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}
