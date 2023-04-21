import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import InputField from '../../Utilities/InputField';
import PrevNextButton from '../../Utilities/PrevNextButton';

const Price = ({currentPage, register, errors, previousPage, nextPage, watch}) => {
  const [isRentPriceValid, setIsRentPriceValid] = useState(true);
  const productPrice = watch("product_price");
  const rentPrice = watch("rent_price");
  useEffect(() => {
    if(parseFloat(rentPrice) >= parseFloat(productPrice)){
      setIsRentPriceValid(false)
    }
    else{
      setIsRentPriceValid(true)
    }
  }, [rentPrice, productPrice]);
  return (
    <div>
      {currentPage === 4 && (
        <div className="mt-5 pt-5">
          <h1 className="fw-bold mb-2 text-center"> Select price </h1>
          <div className="d-flex justify-content-center align-items-center">
            <Form.Group controlId="product_price">
              <InputField register={register} errors={errors} registerType="product_price" type="number" action="number"/>
            </Form.Group>
          </div>
          <div className="mt-2 d-flex justify-content-center align-items-center gap-5">
            <Form.Group controlId="rent_price">
              <h6 className="fw-semibold mb-2"> Rent </h6>
              <InputField register={register} errors={errors} registerType="rent_price" type="number" action="number"/>
              <div className='fw-semibold text-danger d-flex justify-content-start items-center'>
                {!isRentPriceValid && <div className='fw-semibold text-danger d-flex justify-content-start items-center'>Rent price cannot be greater than product price</div>}
              </div>
            </Form.Group>
            <Form.Group>
              <h6 className="fw-semibold mb-2"> Choose Renting Period </h6>
              <InputField register={register} errors={errors} registerType="rent_type" as="select" defaultValue="Hourly">
                <option value="Hourly">Per Hour</option>
                <option value="Daily">Per Day</option>
                <option value="Weekly">Per Week</option>
                <option value="Monthly">Per Month</option>
              </InputField>
            </Form.Group>
          </div>
          <PrevNextButton previousPage={previousPage} nextPage={nextPage} isValid={!isRentPriceValid || Object.keys(errors).length !== 0}/>
        </div>
      )}
    </div>
  );
};

export default Price;