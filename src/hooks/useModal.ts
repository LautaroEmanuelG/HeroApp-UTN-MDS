import { useState, useCallback } from 'react';

interface ModalOptions {
  initialIsOpen?: boolean;
}

interface ModalResult<T> {
  isOpen: boolean;
  modalData: T | null;
  openModal: (data?: T) => void;
  closeModal: () => void;
  toggleModal: () => void;
}

/**
 * Custom hook para manejar el estado de un modal
 * @param options - Opciones de configuración para el modal
 * @returns - Objeto con funciones y estados para el modal
 */
export const useModal = <T = any>(options?: ModalOptions): ModalResult<T> => {
  const [isOpen, setIsOpen] = useState<boolean>(
    options?.initialIsOpen || false
  );
  const [modalData, setModalData] = useState<T | null>(null);

  // Abrir el modal, opcionalmente con datos
  const openModal = useCallback((data?: T) => {
    if (data !== undefined) {
      setModalData(data);
    }
    setIsOpen(true);
  }, []);

  // Cerrar el modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Opcionalmente, podemos limpiar los datos al cerrar
    // setModalData(null);
  }, []);

  // Alternar el estado del modal
  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
    toggleModal,
  };
};
