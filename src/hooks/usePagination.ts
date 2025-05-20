import { useState } from 'react';

interface PaginationOptions {
  initialPage?: number;
  pageSize?: number;
  totalItems?: number;
}

interface PaginationResult {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  getItemsForPage: <T>(items: T[]) => T[];
  setTotalItems: (total: number) => void;
}

/**
 * Custom hook para manejar la paginación
 * @param options - Opciones de configuración de la paginación
 * @returns - Objeto con funciones y estados para la paginación
 */
export const usePagination = (
  options?: PaginationOptions
): PaginationResult => {
  const [currentPage, setCurrentPage] = useState<number>(
    options?.initialPage || 1
  );
  const [pageSize] = useState<number>(options?.pageSize || 20);
  const [totalItems, setTotalItemsState] = useState<number>(
    options?.totalItems || 0
  );

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Función para ir a una página específica
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Función para ir a la siguiente página
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para ir a la página anterior
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Función para obtener los elementos de la página actual
  const getItemsForPage = <T>(items: T[]): T[] => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, items.length);
    return items.slice(startIndex, endIndex);
  };

  // Función para establecer el total de elementos
  const setTotalItems = (total: number) => {
    setTotalItemsState(total);
  };

  return {
    currentPage,
    totalPages,
    pageSize,
    goToPage,
    nextPage,
    previousPage,
    getItemsForPage,
    setTotalItems,
  };
};
