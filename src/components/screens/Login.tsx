import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import '../../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(username, password);

    // Si la autenticación es exitosa, redirigimos al usuario a la página principal
    if (username === 'admin' && password === 'admin') {
      navigate('/marvel-heroes');
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <motion.div
        className="login-card"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}>
            <img src="/marvel-banner.png" alt="logo marvel hero app" />
        <h1 className="login-title">Hero App Login</h1>

        <form
          onSubmit={handleSubmit}
          className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
              {error}
              <button
                type="button"
                className="error-close"
                onClick={clearError}>
                ×
              </button>
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Iniciar Sesión
          </motion.button>
        </form>

        <div className="login-help">
          <p>Hint: Usuario: admin, Contraseña: admin</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
