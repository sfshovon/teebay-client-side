import React from 'react';
import { Form } from 'react-bootstrap';

const InputField = ({ register, registerType, errors, placeholder, type, as, defaultValue, children, action, onChange }) => {
  return (
    <>
      <Form.Control 
        className="border border-secondary-subtle border-2" 
        type={type} 
        as={as}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        {...register(registerType, { 
          required: true, 
          pattern: action === "password"
            ? {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+=[{\]};:<>|./?,-])(?=.*[0-9]).{8,}$/,
                message:
                  "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number, and be at least 8 characters long.",
              }
            : action === "name"
            ? {
                value: /^[A-Za-z. ]+$/i,
                message: "Name can only contain letters and dots",
              }
            : action === "address"
            ? {
                value: /^[a-zA-Z0-9\s,'-]*$/,
                message: "Invalid Address",
              }
            : action === "email"
            ? {
                value: /^[\w.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Please enter a valid email address",
              }
            : action === "tel" 
            ? {
                value: /^(\+?8801|01)[3-9][0-9]{8}$/,    
                message: "Please enter a valid Bangladesh phone number",
            }
            : action === "title" 
            ? {
                value: /^[A-Z][A-Za-z0-9 ]*$/,    
                message: "Please enter a valid title",
            }
            : action === "description" 
            ? {
                value: /^(?=.*[^\s])[\s\S]*$/,    
                message: "Please enter a valid description",
            }
            : action === "number" 
            ? {
                value: /^[0-9]\d*$/,    
                message: "Value can't be negative",
            }
            : undefined,
        })}
      >
        {children}
      </Form.Control>
      {action!=="password" && errors[registerType] && errors[registerType].type === "required" && registerType!=="password" && (
        <div className='fw-semibold text-danger d-flex justify-content-start items-center'>
          {placeholder ? `${placeholder} is required` : "This is a required field"}
        </div>
      )}
      {action!=="password" && errors[registerType] && errors[registerType].type === "pattern" && (
        <div className="fw-semibold text-danger d-flex justify-content-start items-center">
          <span className="text-justify">{errors[registerType].message}</span>
        </div>
      )}
    </>
  );
};

export default InputField;
