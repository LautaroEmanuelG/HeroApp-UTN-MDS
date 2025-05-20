import md5 from 'md5';
import type { IMarvelResponse } from '../types/IHeroes';

// Constantes para la API de Marvel
const MARVEL_API_BASE_URL = 'https://gateway.marvel.com/v1/public';
// Intentamos obtener las claves de las variables de entorno para mayor seguridad
const MARVEL_API_PUBLIC_KEY = import.meta.env.VITE_MARVEL_API_PUBLIC_KEY || '';
const MARVEL_API_PRIVATE_KEY =
  import.meta.env.VITE_MARVEL_API_PRIVATE_KEY || '';

// Clase para manejar las peticiones a la API de Marvel
export class MarvelService {
  // Método para generar el hash MD5 requerido por la API de Marvel
  private static generateHash(timestamp: number): string {
    return md5(`${timestamp}${MARVEL_API_PRIVATE_KEY}${MARVEL_API_PUBLIC_KEY}`);
  }
  // Método para obtener personajes de Marvel
  public static async getCharacters(
    limit = 20,
    offset = 0,
    nameStartsWith?: string
  ): Promise<IMarvelResponse> {
    const timestamp = Date.now();
    const hash = this.generateHash(timestamp);

    try {
      let url = `${MARVEL_API_BASE_URL}/characters?ts=${timestamp}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${offset}`;

      // Si se proporciona una consulta de búsqueda, la añadimos a la URL
      if (nameStartsWith) {
        url += `&nameStartsWith=${encodeURIComponent(nameStartsWith)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as IMarvelResponse;
    } catch (error) {
      console.error('Error fetching Marvel characters:', error);
      throw error;
    }
  }

  // Método para obtener un personaje por ID
  public static async getCharacterById(id: number): Promise<IMarvelResponse> {
    const timestamp = Date.now();
    const hash = this.generateHash(timestamp);

    try {
      const response = await fetch(
        `${MARVEL_API_BASE_URL}/characters/${id}?ts=${timestamp}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash}`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as IMarvelResponse;
    } catch (error) {
      console.error(`Error fetching Marvel character with ID ${id}:`, error);
      throw error;
    }
  }
}
