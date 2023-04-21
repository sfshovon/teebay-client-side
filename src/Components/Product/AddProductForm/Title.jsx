import React from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import InputField from '../../Utilities/InputField';
import PrevNextButton from '../../Utilities/PrevNextButton';

const Title = ({currentPage, register, errors ,nextPage, isValid}) => {
  const navigate = useNavigate();
  const handleBackToProduct = () => {
    navigate("/myProduct");
  }
  return (
    <div>
      {currentPage === 1 && (
        <div className="mt-5 pt-5 text-center">
          <h1 className="fw-bold mb-2"> Select a title for your product </h1>
          <Form.Group>
            <InputField register={register} errors={errors} registerType="title" type="text" action="title"/>
          </Form.Group>
          <PrevNextButton previousPage={handleBackToProduct} nextPage={nextPage} isValid={!isValid}/>
        </div>
      )} 
    </div>
  );
};

export default Title;