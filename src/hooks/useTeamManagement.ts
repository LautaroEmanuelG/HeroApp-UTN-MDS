import { useState, useCallback, useEffect } from 'react';

interface TeamOptions<T> {
  maxTeamSize?: number;
  initialTeam?: T[];
  itemIdentifier?: keyof T;
  storageKey?: string;
}

interface TeamManagementResult<T> {
  team: T[];
  isInTeam: (item: T) => boolean;
  addToTeam: (item: T) => boolean;
  removeFromTeam: (item: T) => void;
  removeFromTeamById: (id: any) => void;
  isTeamFull: boolean;
  clearTeam: () => void;
  teamSize: number;
  maxSize: number;
}

/**
 * Custom hook para manejar la gestión de equipos
 * @param options - Opciones de configuración para el equipo
 * @returns - Objeto con funciones y estados para la gestión del equipo
 */
export const useTeamManagement = <T extends Record<string, any>>(
  options?: TeamOptions<T>
): TeamManagementResult<T> => {
  const maxSize = options?.maxTeamSize || 5;
  const idKey = options?.itemIdentifier || 'id';
  const storageKey = options?.storageKey || 'heroTeam';

  // Intentar recuperar el equipo guardado en localStorage
  const getSavedTeam = (): T[] => {
    if (typeof window !== 'undefined') {
      try {
        const savedTeam = localStorage.getItem(storageKey);
        return savedTeam ? JSON.parse(savedTeam) : [];
      } catch (e) {
        console.error('Error al recuperar el equipo del localStorage:', e);
        return [];
      }
    }
    return [];
  };

  const [team, setTeam] = useState<T[]>(options?.initialTeam || getSavedTeam());

  // Guardar el equipo en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(team));
      } catch (e) {
        console.error('Error al guardar el equipo en localStorage:', e);
      }
    }
  }, [team, storageKey]);

  // Verificar si un elemento está en el equipo
  const isInTeam = useCallback(
    (item: T): boolean => {
      return team.some(teamItem => teamItem[idKey] === item[idKey]);
    },
    [team, idKey]
  );

  // Añadir un elemento al equipo
  const addToTeam = useCallback(
    (item: T): boolean => {
      if (team.length >= maxSize) {
        return false;
      }

      if (isInTeam(item)) {
        return false;
      }

      setTeam(currentTeam => [...currentTeam, item]);
      return true;
    },
    [team, maxSize, isInTeam]
  );

  // Eliminar un elemento del equipo
  const removeFromTeam = useCallback(
    (item: T): void => {
      setTeam(currentTeam =>
        currentTeam.filter(teamItem => teamItem[idKey] !== item[idKey])
      );
    },
    [idKey]
  );

  // Eliminar un elemento del equipo por su ID
  const removeFromTeamById = useCallback(
    (id: any): void => {
      setTeam(currentTeam =>
        currentTeam.filter(teamItem => teamItem[idKey] !== id)
      );
    },
    [idKey]
  );

  // Limpiar el equipo
  const clearTeam = useCallback(() => {
    setTeam([]);
  }, []);

  return {
    team,
    isInTeam,
    addToTeam,
    removeFromTeam,
    removeFromTeamById,
    isTeamFull: team.length >= maxSize,
    clearTeam,
    teamSize: team.length,
    maxSize,
  };
};
