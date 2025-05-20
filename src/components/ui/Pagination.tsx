import { motion } from 'framer-motion';
import { useHeroesStore } from '../../store/heroesStore';
import '../../styles/Pagination.css';

const Pagination = () => {
  const { currentPage, totalPages, goToPage, nextPage, previousPage } =
    useHeroesStore();

  // Crear un array de números de página para mostrar
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];

    // Siempre mostramos 5 páginas como máximo
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Ajustar si estamos cerca del final
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pagination-button"
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}>
        &laquo;
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pagination-button"
        onClick={() => previousPage()}
        disabled={currentPage === 1}>
        &lsaquo;
      </motion.button>

      {getPageNumbers().map(page => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`pagination-button ${
            currentPage === page ? 'active' : ''
          }`}
          onClick={() => goToPage(page)}>
          {page}
        </motion.button>
      ))}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pagination-button"
        onClick={() => nextPage()}
        disabled={currentPage === totalPages}>
        &rsaquo;
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pagination-button"
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}>
        &raquo;
      </motion.button>

      <span className="pagination-info">
        Página {currentPage} de {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
