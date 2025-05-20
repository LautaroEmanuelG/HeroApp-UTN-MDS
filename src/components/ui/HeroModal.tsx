import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroesStore } from '../../store/heroesStore';
import {
  getValidHeroImageUrl,
  handleImageError,
} from '../../utils/imageHelpers';
import '../../styles/HeroModal.css';

const HeroModal = () => {
  const { selectedHero, closeModal, showModal } = useHeroesStore();

  // Efecto para manejar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  // Si no hay héroe seleccionado, no mostramos nada
  if (!selectedHero) return null;

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}>
          <motion.div
            className="modal-content"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={e => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}>
              &times;
            </button>

            <div className="modal-header">
              <h2 className="modal-title">{selectedHero.name}</h2>
            </div>

            <div className="modal-body">
              <div className="modal-image-container">
                {' '}
                <img
                  src={getValidHeroImageUrl(selectedHero)}
                  alt={selectedHero.name}
                  className="modal-image"
                  onError={handleImageError}
                />
              </div>

              <div className="modal-details">
                <h3>Descripción</h3>
                <p>
                  {selectedHero.description || 'Sin descripción disponible'}
                </p>

                {selectedHero.comics.available > 0 && (
                  <div className="modal-section">
                    <h4>Comics ({selectedHero.comics.available})</h4>
                    <ul className="modal-list">
                      {selectedHero.comics.items
                        .slice(0, 5)
                        .map((comic, index) => (
                          <li key={index}>{comic.name}</li>
                        ))}
                      {selectedHero.comics.available > 5 && (
                        <li>Y {selectedHero.comics.available - 5} más...</li>
                      )}
                    </ul>
                  </div>
                )}

                {selectedHero.series.available > 0 && (
                  <div className="modal-section">
                    <h4>Series ({selectedHero.series.available})</h4>
                    <ul className="modal-list">
                      {selectedHero.series.items
                        .slice(0, 3)
                        .map((series, index) => (
                          <li key={index}>{series.name}</li>
                        ))}
                      {selectedHero.series.available > 3 && (
                        <li>Y {selectedHero.series.available - 3} más...</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroModal;
