import React from "react";
import "./Pagination.css";
const Pagination = ({ activeCards, currentPage, setCurrentPage }) => {
  /** The list of page numbers the user can select from*/
  const paginationList = [...Array(Math.round(activeCards.length / 15))].map(
    (item, index) => {
      return (
        <div
          key={index}
          className={`${
            index === currentPage ? "active" : ""
          } pagination-pill bg-gray-100 text-gray-800 text-sm px-2 py-2 inline-block leading-4 truncate
      px-2 py-1  mr-2 mt-2 rounded max-w-lg font-semibold`}
        >
          <a
            href="/#"
            onClick={(event) => {
              event.preventDefault();
              setCurrentPage(index);
            }}
          >
            {index + 1}
          </a>
        </div>
      );
    }
  );
  return (
    <div className="pagination mb-4">
      <div className="flex flex-row mt-2">{paginationList}</div>
    </div>
  );
};

export default Pagination;
