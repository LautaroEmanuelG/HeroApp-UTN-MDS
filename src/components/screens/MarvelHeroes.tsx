import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHeroesStore } from '../../store/heroesStore';
import { useAuthStore } from '../../store/authStore';
// Importamos los componentes desde sus rutas absolutas para evitar problemas
import HeroCard from '../../components/ui/HeroCard';
import HeroModal from '../../components/ui/HeroModal';
import Navbar from '../../components/ui/Navbar';
import HeroTabs from '../../components/ui/HeroTabs';
import Pagination from '../../components/ui/Pagination';
import marvelLogo from '../../assets/marvel-banner.png';
import '../../styles/MarvelHeroes.css';

const MarvelHeroes = () => {
  const [activeTab, setActiveTab] = useState<string>('heroes');
  const { heroes, loading, error, fetchHeroes, showModal } = useHeroesStore();
  const { user } = useAuthStore();

  // Efecto para cargar los héroes cuando el componente se monta
  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  // Variantes de animación para la lista
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  // Variantes de animación para los elementos
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // Renderizar el contenido basado en la pestaña activa
  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="loading">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p>Cargando héroes...</p>
        </div>
      );
    }

    if (error) {
      return (
        <motion.div
          className="error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>
          Error: {error}
        </motion.div>
      );
    }

    if (activeTab === 'heroes') {
      return (
        <>
          <motion.div
            className="heroes-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            {heroes.map(hero => (
              <motion.div
                key={hero.id}
                variants={itemVariants}>
                <HeroCard hero={hero} />
              </motion.div>
            ))}
          </motion.div>
          <Pagination />
        </>
      );
    }

    return null;
  };

  return (
    <div className="marvel-heroes-page">
      <Navbar username={user?.username ?? ''} />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        {' '}
        <div className="heroes-header">
          <img
            src={marvelLogo}
            alt="Marvel Logo"
            className="marvel-header-logo"
          />
          <h1 className="heroes-title">Marvel Heroes</h1>
        </div>
        <HeroTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {activeTab === 'heroes' ? renderTabContent() : null}
      </motion.div>

      {showModal && <HeroModal />}
    </div>
  );
};

export default MarvelHeroes;
