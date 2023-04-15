import React from "react";

const Paggination = ({ bookPerPage, totalBook, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBook / bookPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li className="page-item" key={number}>
            <a className="pagelink" onClick={() => paginate(number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paggination;
