import { useState, useCallback } from 'react';

interface SearchOptions<T> {
  initialQuery?: string;
  searchFunction?: (query: string) => Promise<T[]>;
  searchableFields?: (keyof T)[];
}

interface SearchResult<T> {
  query: string;
  results: T[];
  loading: boolean;
  error: Error | null;
  setQuery: (query: string) => void;
  search: () => Promise<void>;
  reset: () => void;
  searchInItems: (items: T[]) => T[];
}

/**
 * Custom hook para manejar búsquedas
 * @param options - Opciones de configuración para la búsqueda
 * @returns - Objeto con funciones y estados para la búsqueda
 */
export const useSearch = <T extends Record<string, any>>(
  options?: SearchOptions<T>
): SearchResult<T> => {
  const [query, setQuery] = useState<string>(options?.initialQuery || '');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Función para realizar la búsqueda (usando la función proporcionada o una búsqueda local)
  const search = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (options?.searchFunction) {
        // Si se proporciona una función de búsqueda personalizada, la utilizamos
        const searchResults = await options.searchFunction(query);
        setResults(searchResults);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error en la búsqueda'));
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query, options]);

  // Búsqueda local en un array de elementos
  const searchInItems = useCallback(
    (items: T[]): T[] => {
      if (!query.trim()) {
        return [];
      }

      const lowercasedQuery = query.toLowerCase();
      const fields = options?.searchableFields;

      return items.filter(item => {
        if (fields && fields.length > 0) {
          // Buscar solo en los campos especificados
          return fields.some(field => {
            const value = item[field];
            if (typeof value === 'string') {
              return value.toLowerCase().includes(lowercasedQuery);
            }
            return false;
          });
        } else {
          // Buscar en todos los campos de string
          return Object.values(item).some(
            value =>
              typeof value === 'string' &&
              value.toLowerCase().includes(lowercasedQuery)
          );
        }
      });
    },
    [query, options?.searchableFields]
  );

  // Reiniciar la búsqueda
  const reset = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    results,
    loading,
    error,
    setQuery,
    search,
    reset,
    searchInItems,
  };
};
