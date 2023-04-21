import React from 'react';
import PrevNextButton from '../../Utilities/PrevNextButton';

const Review = ({currentPage, previousPage, watch}) => {
  return (
    <div>
      {currentPage === 5 && (
        <div className="mt-5 pt-5">
          <div className="mt-5 d-flex flex-column">
            <h3 className="mb-4 fw-bolder">Summary</h3>
            <p><strong>Title:</strong> {watch("title")}</p>
            <p><strong>Categories:</strong> {watch("categories")}</p> 
            <p><strong>Description:</strong> {watch("description")}</p>
            <div className="d-flex justify-content-start align-items-center gap-2">
              <p><strong>Price:</strong> ${watch("product_price")},</p>
              <p><strong>To rent:</strong> ${watch("rent_price")} {watch("rent_type")}</p>
            </div>
          </div>
          <PrevNextButton previousPage={previousPage} type="submit"/>
        </div>
      )}
    </div>
  );
};

export default Review;