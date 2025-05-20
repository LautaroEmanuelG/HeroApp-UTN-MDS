// filepath: e:\WorkSpace\Estudio\HeroApp-UTN-MDS\src\components\ui\HeroTabs.tsx
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { useHeroesStore } from '../../store/heroesStore';
import type { IMarvelCharacter } from '../../types/IHeroes';
import { useAuthStore } from '../../store/authStore';
import {
  getValidHeroImageUrl,
  handleImageError,
} from '../../utils/imageHelpers';
import '../../styles/HeroTabs.css';

// Interfaz para las propiedades del componente
interface HeroTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const HeroTabs = ({ activeTab, onTabChange }: HeroTabsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    searchHeroes,
    searchResults,
    loading,
    team,
    removeFromTeam,
    openModal,
  } = useHeroesStore();
  const { user } = useAuthStore();

  // Manejador de búsqueda
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    searchHeroes(searchTerm);
  };

  // Manejador para cambio en el input de búsqueda
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Manejador para eliminar un miembro del equipo
  const handleRemoveFromTeam = (heroId: number) => {
    removeFromTeam(heroId);
  };

  return (
    <div className="hero-tabs">
      {/* Cabecera de tabs */}
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === 'heroes' ? 'active' : ''}`}
          onClick={() => onTabChange('heroes')}>
          🦸‍♂️ Heroes
        </button>
        <button
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => onTabChange('search')}>
          🔍 Buscar
        </button>
        <button
          className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => onTabChange('team')}>
          👥 Mi Equipo ({team.length}/5)
        </button>
        <button
          className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => onTabChange('account')}>
          👤 Mi Cuenta
        </button>
      </div>

      {/* Contenido del tab de búsqueda */}
      {activeTab === 'search' && (
        <div className="tab-content search-tab">
          <form
            onSubmit={handleSearch}
            className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Buscar héroes por nombre..."
              className="search-input"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="search-button"
              disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar'}
            </motion.button>
          </form>

          {loading ? (
            <div className="loading-message">Buscando héroes...</div>
          ) : searchResults.length > 0 ? (
            <div className="search-results">
              <h3>Resultados de búsqueda</h3>
              <div className="heroes-grid">
                {searchResults.map(hero => (
                  <HeroSearchResult
                    key={hero.id}
                    hero={hero}
                  />
                ))}
              </div>
            </div>
          ) : searchTerm ? (
            <div className="no-results">
              No se encontraron héroes que coincidan con "{searchTerm}"
            </div>
          ) : null}
        </div>
      )}

      {/* Contenido del tab de equipo */}
      {activeTab === 'team' && (
        <div className="tab-content team-tab">
          <h3>Mi Equipo de Héroes ({team.length}/5)</h3>

          {team.length === 0 ? (
            <div className="empty-team">
              <p>No has añadido ningún héroe a tu equipo.</p>
              <p>
                Puedes añadir hasta 5 héroes haciendo clic en "Añadir al equipo"
                en la tarjeta de cualquier héroe.
              </p>
            </div>
          ) : (
            <div className="team-heroes">
              {' '}
              {team.map(hero => (
                <div
                  key={hero.id}
                  className="team-hero-card"
                  onClick={() => openModal(hero)}>
                  {' '}
                  <img
                    src={getValidHeroImageUrl(hero)}
                    alt={hero.name}
                    className="team-hero-image"
                    onError={handleImageError}
                  />
                  <div className="team-hero-details">
                    <h4>{hero.name}</h4>
                    <p>
                      {hero.description || 'Sin descripción disponible'}
                    </p>{' '}
                    <button
                      className="remove-team-button"
                      onClick={e => {
                        e.stopPropagation(); // Evitar que se abra el modal
                        handleRemoveFromTeam(hero.id);
                      }}>
                      ✓ Quitar del equipo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Contenido del tab de cuenta */}
      {activeTab === 'account' && (
        <div className="tab-content account-tab">
          <div className="account-container">
            <div className="account-header">
              <span className="account-avatar">👤</span>
              <h3>Detalles de la cuenta</h3>
            </div>

            <div className="account-details">
              <div className="account-field">
                <span className="field-label">Usuario:</span>
                <span className="field-value">
                  {user?.username || 'No disponible'}
                </span>
              </div>
              <div className="account-field">
                <span className="field-label">Estado:</span>
                <span className="field-value status-active">Activo</span>
              </div>
              <div className="account-field">
                <span className="field-label">Rol:</span>
                <span className="field-value">Usuario</span>
              </div>
              <div className="account-field">
                <span className="field-label">Fecha de ingreso:</span>
                <span className="field-value">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente auxiliar para resultados de búsqueda
const HeroSearchResult = ({ hero }: { hero: IMarvelCharacter }) => {
  const { openModal, addToTeam, removeFromTeam, team } = useHeroesStore();
  const isInTeam = team.some(member => member.id === hero.id);
  const isTeamFull = team.length >= 5;

  const handleTeamButtonClick = () => {
    if (isInTeam) {
      removeFromTeam(hero.id);
    } else if (!isTeamFull) {
      addToTeam(hero);
    }
  };

  return (
    <motion.div
      className="hero-search-result"
      whileHover={{ scale: 1.03 }}>
      {' '}
      <div
        className="search-result-image"
        onClick={() => openModal(hero)}>
        <img
          src={getValidHeroImageUrl(hero)}
          alt={hero.name}
          onError={handleImageError}
        />
      </div>
      <div className="search-result-details">
        <h4 onClick={() => openModal(hero)}>{hero.name}</h4>
        <p>{hero.description || 'Sin descripción disponible'}</p>
        <button
          className={`add-team-button ${isInTeam ? 'in-team' : ''} ${
            isTeamFull && !isInTeam ? 'disabled' : ''
          }`}
          onClick={handleTeamButtonClick}
          disabled={!isInTeam && isTeamFull}>
          {isInTeam
            ? '✓ Quitar del equipo'
            : isTeamFull
            ? 'Equipo lleno'
            : 'Añadir al equipo'}
        </button>
      </div>
    </motion.div>
  );
};

export default HeroTabs;
