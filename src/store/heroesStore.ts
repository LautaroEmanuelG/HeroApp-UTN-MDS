// filepath: e:\WorkSpace\Estudio\HeroApp-UTN-MDS\src\store\heroesStore.ts
import { create } from 'zustand';
import type { IMarvelCharacter } from '../types/IHeroes';
import { MarvelService } from '../services/marvelService';

// Interfaz para el estado de héroes
interface IHeroesState {
  heroes: IMarvelCharacter[];
  loading: boolean;
  error: string | null;
  selectedHero: IMarvelCharacter | null;
  showModal: boolean;

  // Paginación
  currentPage: number;
  totalPages: number;
  limit: number;

  // Búsqueda
  searchQuery: string;
  searchResults: IMarvelCharacter[];

  // Equipo
  team: IMarvelCharacter[];

  // Acciones
  fetchHeroes: (page?: number) => Promise<void>;
  searchHeroes: (query: string) => Promise<void>;
  setSelectedHero: (hero: IMarvelCharacter | null) => void;
  openModal: (hero: IMarvelCharacter) => void;
  closeModal: () => void;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  addToTeam: (hero: IMarvelCharacter) => void;
  removeFromTeam: (heroId: number) => void;
}

// Store de héroes usando Zustand
export const useHeroesStore = create<IHeroesState>((set, get) => ({
  heroes: [],
  loading: false,
  error: null,
  selectedHero: null,
  showModal: false,
  // Estado de paginación
  currentPage: 1,
  totalPages: 0,
  limit: 10, // Cambiado de 20 a 10 héroes por página

  // Estado de búsqueda
  searchQuery: '',
  searchResults: [],

  // Estado del equipo
  team: [],

  // Función para obtener los héroes de la API de Marvel
  fetchHeroes: async (page = 1) => {
    try {
      set({ loading: true, error: null });
      const limit = get().limit;
      const offset = (page - 1) * limit;

      try {
        // Intentamos obtener datos reales de la API de Marvel
        const response = await MarvelService.getCharacters(limit, offset);
        const totalPages = Math.ceil(response.data.total / limit);
        set({
          heroes: response.data.results,
          loading: false,
          currentPage: page,
          totalPages,
        });
      } catch (apiError) {
        console.warn(
          'Error al obtener datos de la API de Marvel, usando datos de ejemplo:',
          apiError
        ); // Si falla la API (por ejemplo, si no hay claves configuradas), usamos datos de ejemplo
        setTimeout(() => {
          // Datos de ejemplo con muchos personajes para simular paginación          // Lista de 20 personajes Marvel con URLs reales para las imágenes
          const mockHeroes = [
            {
              id: 1,
              name: 'Iron Man',
              description: 'Genio, millonario, playboy, filántropo',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 2,
              name: 'Captain America',
              description:
                'Super soldado defensor de la justicia y la libertad',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 3,
              name: 'Thor',
              description:
                'Dios del trueno de Asgard y miembro de los Vengadores',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 4,
              name: 'Hulk',
              description:
                'El hombre increíble con super fuerza y regeneración',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 5,
              name: 'Black Widow',
              description: 'Espía maestra y miembro de los Vengadores',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/f/30/50fecad1f395b',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 6,
              name: 'Spider-Man',
              description: 'El amigable vecino arácnido de Nueva York',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/30/538cd33e15ab7',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 7,
              name: 'Doctor Strange',
              description: 'Maestro de las artes místicas y antiguo cirujano',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/5/f0/5261a85a501fe',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 8,
              name: 'Black Panther',
              description: 'Rey de Wakanda y protector de la nación',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/1/c0/537ba2bfd6bab',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 9,
              name: 'Scarlet Witch',
              description:
                'Poderosa superheroína con habilidades de manipulación de la realidad',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/b0/537bc2375dfb9',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 10,
              name: 'Vision',
              description: 'Androide sintético con la Gema de la Mente',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/d0/5111527040594',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 11,
              name: 'Captain Marvel',
              description:
                'Una de las heroínas más poderosas con habilidades cósmicas',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/10/537ba5ff07aa4',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 12,
              name: 'Ant-Man',
              description:
                'Scott Lang, ladrón reformado con tecnología de cambio de tamaño',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/6/90/54ad7297b0a59',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 13,
              name: 'Wasp',
              description:
                'Hope van Dyne, heroína con alas y tecnología de encogimiento',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/5/70/538fea6b92bbd',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 14,
              name: 'Hawkeye',
              description:
                'Clint Barton, maestro arquero y miembro de los Vengadores',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/e/90/50fecaf4f101b',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 15,
              name: 'Falcon',
              description:
                'Sam Wilson, piloto con alas mecánicas y nuevo Capitán América',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/f/b0/5111505fb7009',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 16,
              name: 'Winter Soldier',
              description:
                'Bucky Barnes, antiguo compañero de Capitán América y ex-asesino',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/d/03/5265478293c1e',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 17,
              name: 'War Machine',
              description: 'James Rhodes, piloto militar con armadura avanzada',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/00/4c0030bee8c86',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 18,
              name: 'Star-Lord',
              description: 'Peter Quill, líder de los Guardianes de la Galaxia',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/a0/537bc55e8b1f5',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 19,
              name: 'Groot',
              description:
                'Árbol alienígena miembro de los Guardianes de la Galaxia',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/10/526033c8b474a',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
            {
              id: 20,
              name: 'Rocket Raccoon',
              description:
                'Mapache modificado genéticamente experto en armas y tecnología',
              modified: '2023-01-01',
              thumbnail: {
                path: 'http://i.annihil.us/u/prod/marvel/i/mg/9/b0/50fec1e49298a',
                extension: 'jpg',
              },
              resourceURI: '',
              comics: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              series: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: {
                available: 0,
                collectionURI: '',
                items: [],
                returned: 0,
              },
              urls: [],
            },
          ]; // Simulamos paginación
          // 5 páginas con 10 héroes por página (50 héroes en total)
          const totalMockHeroes = 50;
          const totalPages = Math.ceil(totalMockHeroes / get().limit);

          // Algoritmo sencillo para mostrar personajes diferentes basados en la página
          const startIndex = ((page - 1) * get().limit) % mockHeroes.length;
          const pageHeroes = [];

          for (let i = 0; i < get().limit; i++) {
            const heroIndex = (startIndex + i) % mockHeroes.length;
            const hero = { ...mockHeroes[heroIndex] };

            // Modificamos el id y nombre para simular personajes diferentes
            hero.id = (page - 1) * get().limit + i + 1;
            hero.name = `${mockHeroes[heroIndex].name} (${hero.id})`;

            pageHeroes.push(hero);
          }

          set({
            heroes: pageHeroes,
            loading: false,
            currentPage: page,
            totalPages,
          });
        }, 1000);
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  }, // Función para buscar héroes
  searchHeroes: async (query: string) => {
    try {
      if (!query.trim()) {
        set({ searchResults: [], searchQuery: '' });
        return;
      }

      set({ loading: true, error: null, searchQuery: query });

      try {
        // Intentamos buscar con la API de Marvel
        const response = await MarvelService.getCharacters(100, 0, query);
        set({ searchResults: response.data.results, loading: false });
      } catch (apiError) {
        console.warn(
          'Error al buscar en la API de Marvel, usando datos de ejemplo:',
          apiError
        );

        // Si falla la API, generamos resultados de búsqueda mock
        setTimeout(() => {
          // Lista con los 20 héroes de ejemplo (igual que en fetchHeroes)
          const mockHeroes = [
            {
              id: 1,
              name: 'Iron Man',
              description: 'Genio, millonario, playboy, filántropo',
            },
            {
              id: 2,
              name: 'Captain America',
              description:
                'Super soldado defensor de la justicia y la libertad',
            },
            {
              id: 3,
              name: 'Thor',
              description:
                'Dios del trueno de Asgard y miembro de los Vengadores',
            },
            {
              id: 4,
              name: 'Hulk',
              description:
                'El hombre increíble con super fuerza y regeneración',
            },
            {
              id: 5,
              name: 'Black Widow',
              description: 'Espía maestra y miembro de los Vengadores',
            },
            {
              id: 6,
              name: 'Spider-Man',
              description: 'El amigable vecino arácnido de Nueva York',
            },
            {
              id: 7,
              name: 'Doctor Strange',
              description: 'Maestro de las artes místicas y antiguo cirujano',
            },
            {
              id: 8,
              name: 'Black Panther',
              description: 'Rey de Wakanda y protector de la nación',
            },
            {
              id: 9,
              name: 'Scarlet Witch',
              description:
                'Poderosa superheroína con habilidades de manipulación de la realidad',
            },
            {
              id: 10,
              name: 'Vision',
              description: 'Androide sintético con la Gema de la Mente',
            },
            {
              id: 11,
              name: 'Captain Marvel',
              description:
                'Una de las heroínas más poderosas con habilidades cósmicas',
            },
            {
              id: 12,
              name: 'Ant-Man',
              description:
                'Scott Lang, ladrón reformado con tecnología de cambio de tamaño',
            },
            {
              id: 13,
              name: 'Wasp',
              description:
                'Hope van Dyne, heroína con alas y tecnología de encogimiento',
            },
            {
              id: 14,
              name: 'Hawkeye',
              description:
                'Clint Barton, maestro arquero y miembro de los Vengadores',
            },
            {
              id: 15,
              name: 'Falcon',
              description:
                'Sam Wilson, piloto con alas mecánicas y nuevo Capitán América',
            },
            {
              id: 16,
              name: 'Winter Soldier',
              description:
                'Bucky Barnes, antiguo compañero de Capitán América y ex-asesino',
            },
            {
              id: 17,
              name: 'War Machine',
              description: 'James Rhodes, piloto militar con armadura avanzada',
            },
            {
              id: 18,
              name: 'Star-Lord',
              description: 'Peter Quill, líder de los Guardianes de la Galaxia',
            },
            {
              id: 19,
              name: 'Groot',
              description:
                'Árbol alienígena miembro de los Guardianes de la Galaxia',
            },
            {
              id: 20,
              name: 'Rocket Raccoon',
              description:
                'Mapache modificado genéticamente experto en armas y tecnología',
            },          ].map((h, index) => {
            // Array de URLs de imágenes reales de Marvel con extensión jpg
            const marvelImagePaths = [
                'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55',
                'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
                'http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350',
                'http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0',
                'http://i.annihil.us/u/prod/marvel/i/mg/f/30/50fecad1f395b',
                'http://i.annihil.us/u/prod/marvel/i/mg/9/30/538cd33e15ab7',
                'http://i.annihil.us/u/prod/marvel/i/mg/5/f0/5261a85a501fe',
                'http://i.annihil.us/u/prod/marvel/i/mg/1/c0/537ba2bfd6bab',
                'http://i.annihil.us/u/prod/marvel/i/mg/9/b0/537bc2375dfb9',
                'http://i.annihil.us/u/prod/marvel/i/mg/9/d0/5111527040594',
                'http://i.annihil.us/u/prod/marvel/i/mg/c/10/537ba5ff07aa4',
                'http://i.annihil.us/u/prod/marvel/i/mg/6/90/54ad7297b0a59',
                'http://i.annihil.us/u/prod/marvel/i/mg/5/70/538fea6b92bbd',
                'http://i.annihil.us/u/prod/marvel/i/mg/e/90/50fecaf4f101b',
                'http://i.annihil.us/u/prod/marvel/i/mg/f/b0/5111505fb7009',
                'http://i.annihil.us/u/prod/marvel/i/mg/d/03/5265478293c1e',
                'http://i.annihil.us/u/prod/marvel/i/mg/9/00/4c0030bee8c86',
                'http://i.annihil.us/u/prod/marvel/i/mg/9/a0/537bc55e8b1f5',
                'http://i.annihil.us/u/prod/marvel/i/mg/3/10/526033c8b474a',
                'http://i.annihil.us/u/prod/marvel/i/mg/9/b0/50fec1e49298a'
            ];

            return {
              ...h,
              modified: '2023-01-01',
              thumbnail: {
                path: marvelImagePaths[index % marvelImagePaths.length],
                extension: 'jpg',
              },
              resourceURI: '',
              comics: { available: 0, collectionURI: '', items: [], returned: 0 },
              series: { available: 0, collectionURI: '', items: [], returned: 0 },
              stories: {
                available: 0,
                collectionURI: '',
                items: [{ resourceURI: '', name: '', type: '' }],
                returned: 0,
              },
              events: { available: 0, collectionURI: '', items: [], returned: 0 },
              urls: [],
            };
          });

          // Filtramos los resultados basados en la consulta
          const results = mockHeroes.filter(
            hero =>
              hero.name.toLowerCase().includes(query.toLowerCase()) ||
              (hero.description &&
                hero.description.toLowerCase().includes(query.toLowerCase()))
          );

          set({ searchResults: results, loading: false });
        }, 500);
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  // Funciones de paginación
  nextPage: async () => {
    const { currentPage, totalPages, fetchHeroes } = get();
    if (currentPage < totalPages) {
      await fetchHeroes(currentPage + 1);
    }
  },

  previousPage: async () => {
    const { currentPage, fetchHeroes } = get();
    if (currentPage > 1) {
      await fetchHeroes(currentPage - 1);
    }
  },

  goToPage: async (page: number) => {
    const { totalPages, fetchHeroes } = get();
    if (page >= 1 && page <= totalPages) {
      await fetchHeroes(page);
    }
  },

  // Funciones de equipo
  addToTeam: hero => {
    const { team } = get();

    // Máximo 5 miembros en el equipo
    if (team.length >= 5) {
      return;
    }

    // No permitimos duplicados
    if (!team.some(member => member.id === hero.id)) {
      set({ team: [...team, hero] });
    }
  },

  removeFromTeam: heroId => {
    const { team } = get();
    set({ team: team.filter(hero => hero.id !== heroId) });
  },

  // Función para seleccionar un héroe
  setSelectedHero: hero => {
    set({ selectedHero: hero });
  },

  // Función para abrir el modal con un héroe
  openModal: hero => {
    set({ selectedHero: hero, showModal: true });
  },

  // Función para cerrar el modal
  closeModal: () => {
    set({ showModal: false });
  },
}));
