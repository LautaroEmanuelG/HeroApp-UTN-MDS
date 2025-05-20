import { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../components/screens/Login';
import MarvelHeroes from '../components/screens/MarvelHeroes';

export const AppRouter = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Efecto para verificar si el usuario ya está autenticado (por si refresca la página)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser.isAuthenticated) {
          useAuthStore.setState({ user: parsedUser, error: null });
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Efecto para redirigir si el usuario ya está autenticado
  useEffect(() => {
    if (user?.isAuthenticated && window.location.pathname === '/login') {
      navigate('/marvel-heroes');
    }
  }, [user, navigate]);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/marvel-heroes"
          element={<MarvelHeroes />}
        />
      </Route>

      {/* Redirección por defecto */}
      <Route
        path="/"
        element={
          <Navigate to={user?.isAuthenticated ? '/marvel-heroes' : '/login'} />
        }
      />
      <Route
        path="*"
        element={
          <Navigate to={user?.isAuthenticated ? '/marvel-heroes' : '/login'} />
        }
      />
    </Routes>
  );
};
