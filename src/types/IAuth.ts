// Interfaces para la autenticación y usuario
export interface IUser {
  username: string;
  isAuthenticated: boolean;
}

export interface IAuthState {
  user: IUser | null;
  error: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  clearError: () => void;
}
