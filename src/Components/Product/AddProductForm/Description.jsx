import React from 'react';
import { Form } from 'react-bootstrap';
import InputField from '../../Utilities/InputField';
import PrevNextButton from '../../Utilities/PrevNextButton';

const Description = ({currentPage, register, errors, previousPage, nextPage, isValid}) => {
  return (
    <div>
      {currentPage === 3 && (
        <div className="mt-5 pt-5 text-center">
          <h1 className="fw-bold mb-2"> Select description </h1>
          <Form.Group>
            <InputField register={register} errors={errors} registerType="description" as="textarea" action="description"/>
          </Form.Group>
          <PrevNextButton previousPage={previousPage} nextPage={nextPage} isValid={!isValid}/>
        </div>
      )}
    </div>
  );
};

export default Description;