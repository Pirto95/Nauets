import React from 'react'

const Pagination = ({ totalPages, currentPage, onPageChange }) => {

    //funzione per passare alla pagina precedente
    const previous = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
    
    //funzione per passare alla pagina successiva
    const next = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    return (
        <div className="pagination" >
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`} onClick={previous}>
              <span className="page-link">Previous</span>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item${index + 1 === currentPage ? ' active' : ''}`} onClick={() => onPageChange(index + 1)}>
                <span className="page-link">{index + 1}</span>
              </li>
            ))}
            <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`} onClick={next}>
              <span className="page-link">Next</span>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Pagination;