import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, totalResults, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (


    <>
<div className='container'>
<div className='paginationContainer'>
      <span className='resultText dropdown'>
        Showing 
        <button className='btn-showing dropdown-toggle' id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        6
        </button>
         
        of {totalResults} Results
        </span>
      <span className='pageInfo' >Page {currentPage} of {totalPages}</span>
      <button onClick={handlePrevious} disabled={currentPage === 1} className='button'>
        &lt;
      </button>
      <button onClick={handleNext} disabled={currentPage === totalPages} className='button'>
        &gt;
      </button>
    </div>
</div>

    
    </>
  );
};


export default Pagination;