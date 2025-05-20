import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

// Componente para rutas protegidas
const ProtectedRoutes = () => {
  const { user } = useAuthStore();

  // Comprobamos si el usuario está autenticado
  // Si no está autenticado, lo redirigimos al login
  if (!user?.isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Si está autenticado, renderizamos el contenido de la ruta
  return <Outlet />;
};

export default ProtectedRoutes;
