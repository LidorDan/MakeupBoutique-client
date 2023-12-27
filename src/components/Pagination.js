import React from "react";
import "../styles/Pagination.css";

const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = []; 
  const result = Math.ceil(totalProducts / productsPerPage);
  for (let i = 1; i <= result; i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <a
            onClick={() => onPageChange(number)}
            href="javascript:void(0)"
            className="page-link"
          >
            {number}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
