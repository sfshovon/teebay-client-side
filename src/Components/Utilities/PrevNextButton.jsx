import React from 'react';
import { Button } from 'react-bootstrap';

const PrevNextButton = ({ previousPage, nextPage, isValid, type}) => {
  return (
    <div className="mt-5 d-flex justify-content-between align-items-center">
      <Button variant="primary" onClick={previousPage}> Back </Button>
      { 
        type==="submit" 
        ? 
        <Button variant="primary" type={type}> Submit </Button>
        :
        <Button variant="primary" onClick={nextPage} disabled={isValid}> Next </Button>
      }
    </div>
  );
};

export default PrevNextButton;