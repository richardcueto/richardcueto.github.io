import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Genera el rango de páginas a mostrar con puntos suspensivos ("...")
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (
    e: React.MouseEvent,
    page: number
  ) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
      <div className="w-full px-4">
        <ul className="flex items-center justify-center pt-8">
          {/* Botón Prev */}
          <li className="mx-1">
            <button
              onClick={(e) => handlePageClick(e, currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition ${
                currentPage === 1
                  ? "bg-body-color/10 text-body-color/40 cursor-not-allowed"
                  : "bg-body-color/15 text-body-color hover:bg-primary hover:text-white"
              }`}
            >
              Prev
            </button>
          </li>

          {/* Números de página */}
          {getPageNumbers().map((page, index) => (
            <li key={index} className="mx-1">
              {typeof page === "number" ? (
                <button
                  onClick={(e) => handlePageClick(e, page)}
                  className={`flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition ${
                    currentPage === page
                      ? "bg-primary text-white font-semibold"
                      : "bg-body-color/15 text-body-color hover:bg-primary hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span className="bg-body-color/15 text-body-color flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md px-4 text-sm">
                  {page}
                </span>
              )}
            </li>
          ))}

          {/* Botón Next */}
          <li className="mx-1">
            <button
              onClick={(e) => handlePageClick(e, currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition ${
                currentPage === totalPages
                  ? "bg-body-color/10 text-body-color/40 cursor-not-allowed"
                  : "bg-body-color/15 text-body-color hover:bg-primary hover:text-white"
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};