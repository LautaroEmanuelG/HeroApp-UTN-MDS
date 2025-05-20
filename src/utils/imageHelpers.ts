import type { IMarvelCharacter } from '../types/IHeroes';
import { MARVEL_IMAGE_URLS, DEFAULT_MARVEL_IMAGE } from './mockImageUrls';

/**
 * Obtiene una URL de imagen válida para un héroe de Marvel
 * Si la imagen original no está disponible, selecciona una aleatoria del banco de imágenes
 *
 * @param hero Personaje de Marvel
 * @returns URL de imagen válida
 */
export const getValidHeroImageUrl = (hero: IMarvelCharacter): string => {
  // Si el héroe tiene una imagen válida y no es la imagen por defecto de Marvel, la usamos
  if (
    hero.thumbnail &&
    hero.thumbnail.path &&
    hero.thumbnail.extension &&
    !hero.thumbnail.path.includes('image_not_available')
  ) {
    return `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
  }

  // Si no, usamos una imagen del banco de imágenes basada en el ID del héroe
  const imageIndex =
    (typeof hero.id === 'number' ? hero.id - 1 : 0) % MARVEL_IMAGE_URLS.length;
  return `${MARVEL_IMAGE_URLS[imageIndex]}.jpg`;
};

/**
 * Maneja el error de carga de imagen, sustituyendo la fuente por una imagen alternativa
 *
 * @param e Evento de error de la imagen
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = `${DEFAULT_MARVEL_IMAGE}.jpg`;
};
