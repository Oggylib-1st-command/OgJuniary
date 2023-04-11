import React from "react";

const Paggination = ({bookPerPage, totalBook, paginate}) => {
    const pageNumbers = []
    for(let i=1; i <= Math.ceil(totalBook/bookPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <div>
            <ul className = "pagination">
                {
                    pageNumbers.map(number => (
                        <li className="page-item" key={number}>
                            <a href="!#" className="pagelink" onClick={() => paginate()}>
                                {number}
                            </a>

                        </li>
                    ))
                }   
            </ul>
        </div>
    )
}

export default Paggination;