import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import './App.css';

export const App = () => {
  // No necesitamos usar user directamente, solo para inicializar el estado

  // Efecto para cargar el usuario desde localStorage al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        useAuthStore.setState({ user: parsedUser });
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
