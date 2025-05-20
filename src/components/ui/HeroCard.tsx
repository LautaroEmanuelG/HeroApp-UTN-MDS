import { motion } from 'framer-motion';
import type { IMarvelCharacter } from '../../types/IHeroes';
import { useHeroesStore } from '../../store/heroesStore';
import {
  getValidHeroImageUrl,
  handleImageError,
} from '../../utils/imageHelpers';
import '../../styles/HeroCard.css';

interface HeroCardProps {
  hero: IMarvelCharacter;
  showActions?: boolean;
}

const HeroCard = ({ hero, showActions = true }: HeroCardProps) => {
  const { openModal, addToTeam, removeFromTeam, team } = useHeroesStore();

  const isInTeam = team.some(member => member.id === hero.id);
  const isTeamFull = team.length >= 5;

  const handleCardClick = () => {
    openModal(hero);
  };

  const handleTeamButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se abra el modal

    if (isInTeam) {
      // Si ya está en el equipo, lo removemos
      removeFromTeam(hero.id);
    } else if (!isTeamFull) {
      // Si no está en el equipo y hay espacio, lo añadimos
      addToTeam(hero);
    }
  };

  return (
    <motion.div
      className="hero-card"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCardClick}>
      <div className="hero-card-image-container">
        {' '}
        <img
          src={getValidHeroImageUrl(hero)}
          alt={`${hero.name}`}
          className="hero-card-image"
          onError={handleImageError}
        />
      </div>
      <div className="hero-card-content">
        <h3 className="hero-card-name">{hero.name}</h3>
        <p className="hero-card-description">
          {hero.description
            ? hero.description.length > 100
              ? `${hero.description.substring(0, 100)}...`
              : hero.description
            : 'Sin descripción disponible'}
        </p>{' '}
        {showActions && (
          <motion.button
            className={`hero-card-team-button ${isInTeam ? 'in-team' : ''} ${
              isTeamFull && !isInTeam ? 'disabled' : ''
            }`}
            onClick={handleTeamButtonClick}
            disabled={!isInTeam && isTeamFull}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            {isInTeam
              ? '✓ Quitar del equipo'
              : isTeamFull
              ? 'Equipo lleno'
              : 'Añadir al equipo'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default HeroCard;
