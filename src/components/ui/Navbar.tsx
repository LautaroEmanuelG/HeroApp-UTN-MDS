import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import marvelLogo from '../../assets/marvel-banner.png';
import '../../styles/Navbar.css';

interface NavbarProps {
  username: string;
}

const Navbar = ({ username }: NavbarProps) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}>
      {' '}
      <div className="navbar-logo">
        <img
          src={marvelLogo}
          alt="Marvel Logo"
          className="marvel-logo"
        />
        <span className="logo-text">Heroes App</span>
      </div>
      {username && (
        <div className="navbar-user">
          <span className="welcome-message">¡Bienvenido, {username}!</span>
          <motion.button
            className="logout-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}>
            Cerrar Sesión
          </motion.button>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
