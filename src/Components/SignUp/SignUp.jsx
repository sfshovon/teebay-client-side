import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ADD_USER } from '../Schemas/Mutations';
import { GET_USERS } from '../Schemas/Queries';
import InputField from '../Utilities/InputField';
import PageTitle from '../Utilities/PageTitle';

const SignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true); 
  const passwordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const confirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const password = watch("password");
  const confirmPassword = watch("confirm_password");
  const [addUser, { error: AddError }] = useMutation(ADD_USER);
  const createUser = async (data) => {
    console.log(data)
    await addUser({
      variables: {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        password: data?.password,
        address: data?.address,
        phone_number: data?.phone_number
      },
      refetchQueries: [{query: GET_USERS}], //instantly re-render the UI
    })
    if (AddError) {
      console.log(AddError)
    }
    reset(); // reset the input fields value
  }
  const onSubmit = (data) => {
    const passwordMatch = password === confirmPassword;
    setIsPasswordMatch(passwordMatch);
    if(passwordMatch) {
      createUser(data);
      toast("User Has Been Created");
      navigate("/login")
    }
  };
  return (
    <div>
      <PageTitle title="Sign Up"/>
      <div className="mt-5 text-center">
        <h1 className="fw-normal"> SIGN UP </h1>
        <Container className="d-flex justify-content-center align-items-center pt-2">
          <div className="border border-secondary-subtle border-3 px-5 pt-5 pb-3" style={{ width: "550px",}}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex justify-content-between align-items-center">
                <Form.Group className="mb-2">
                  <InputField register={register} errors={errors} placeholder="First Name" registerType="first_name" type="text" action="name"/>
                </Form.Group>
                <Form.Group className="mb-2">
                  <InputField register={register} errors={errors} placeholder="Last Name" registerType="last_name" type="text" action="name"/>
                </Form.Group>   
              </div>
              <Form.Group className="mb-2">
                <InputField register={register} errors={errors} placeholder="Address" registerType="address" type="text" action="address"/>
              </Form.Group>          
              <div className="d-flex justify-content-between align-items-center">
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <InputField register={register} errors={errors} placeholder="Email" registerType="email" type="email" action="email"/>
                </Form.Group>
                <Form.Group className="mb-2">
                  <InputField register={register} errors={errors} placeholder="Phone Number" registerType="phone_number" type="tel" action="tel"/>
                </Form.Group>
              </div>   
              <div className="input-group">
                <InputField register={register} errors={errors} placeholder="Password" registerType="password" type={isPasswordVisible ? "text" : "password"} action="password"/>
                <button type="button" className="btn btn-outline-secondary" onClick={passwordVisibility}>
                  {isPasswordVisible ? <BiHide /> : <BiShow />}
                </button>
              </div>
              <div className="fw-semibold text-danger d-flex justify-content-start items-center">
                {errors.password && errors.password.type === "required" && (
                  <span>Password is required</span>
                )}
                {errors.password && errors.password.type === "pattern" && (
                  <span>{errors.password.message}</span>
                )}
              </div>
              <div className="input-group mt-4">
                <InputField register={register} errors={errors} placeholder="Confirm Password" registerType="confirm_password" type={isConfirmPasswordVisible ? "text" : "password"} action="password"/>
                <button type="button" className="btn btn-outline-secondary" onClick={confirmPasswordVisibility}>
                  {isConfirmPasswordVisible ? <BiHide /> : <BiShow />}
                </button>
              </div>
              <div className="fw-semibold text-danger d-flex justify-content-start items-center">
                {errors.confirm_password && errors.confirm_password.type === "required" && (
                  <span>Confirm password is required</span>
                )}
                {errors.confirm_password && errors.confirm_password.type === "pattern" && (
                  <span>{errors.confirm_password.message}</span>
                )}
              </div>
              <div className='fw-semibold text-danger d-flex justify-content-start items-center'>
                {!isPasswordMatch && <span>Passwords do not match!</span>}
              </div>
              <Button type="submit" variant="primary" className="fw-semibold mt-4" size="md">
                REGISTER
              </Button>
              <p className="mt-4">Already have an account? <Link to="/login" className="fw-semibold text-primary text-decoration-none">  Sign In </Link> </p>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SignUp;