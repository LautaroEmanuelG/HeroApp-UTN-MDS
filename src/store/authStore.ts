import { create } from 'zustand';
import type { IAuthState, IUser } from '../types/IAuth';

// Constantes para la autenticación
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

// Store de autenticación usando Zustand
export const useAuthStore = create<IAuthState>(set => ({
  user: null,
  error: null,

  // Función de login
  login: (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const user: IUser = {
        username,
        isAuthenticated: true,
      };

      // Guardamos el usuario en localStorage para mantener la sesión
      localStorage.setItem('user', JSON.stringify(user));

      set({ user, error: null });
    } else {
      set({ error: 'Usuario o contraseña incorrectos' });
    }
  },

  // Función de logout
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, error: null });
  },

  // Función para limpiar errores
  clearError: () => {
    set({ error: null });
  },
}));
