import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-300"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-green-500 text-white"
              : "bg-gray-200 hover:bg-green-400"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-300"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
