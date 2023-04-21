import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';
import { GET_USERS } from '../Schemas/Queries';
import InputField from '../Utilities/InputField';
import PageTitle from '../Utilities/PageTitle';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const [loginError, setLoginError] = useState(false); 
  const [users, setUsers] = useState(); 
  const passwordVisibility = () => { 
    setIsPasswordVisible(!isPasswordVisible);
  };
  const navigate = useNavigate(); 
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const { error, loading, data } = useQuery(GET_USERS)
  const { setIsLoggedIn } = useContext(UserContext);
  useEffect(() => {
    if (data) {
      setUsers(data.allUsers);
    }
  }, [data]);
  const checkLogin = (formData) => {
    const { email, password } = formData;
    const user = users?.find(user => user?.email === email);
    if (user) {
      if (user.password === password) {
        setIsLoggedIn(true);
        const { id, first_name, last_name, email: userEmail } = user;
        const userValues = { id, first_name, last_name, email: userEmail };
        localStorage.setItem('currentUser', JSON.stringify(userValues));
        localStorage.setItem('userID', userValues.id);
        toast(`${user.first_name} Has Logged In Successfully!`);
        navigate("/myProduct");  
      } else {
        setLoginError("Incorrect email or password");
      }
    } 
    else {
      setLoginError("User not found");
    }
  };
  if(loading){
    return <h1>{loading}</h1>
  }
  if(error) {
    return <h1>{error}</h1>
  }
  return (
    <div>
      <PageTitle title="Login"/>
      <div className="mt-5 text-center">
        <h1 className="fw-normal"> SIGN IN </h1>
        <Container className="d-flex justify-content-center align-items-center pt-2">
          <div className="border border-secondary-subtle border-3 p-5" style={{ width: "380px",}}>
          <Form onSubmit={handleSubmit(checkLogin)}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <InputField register={register} errors={errors} placeholder="Email" registerType="email" type="email"/>
            </Form.Group>
            <div className="input-group mt-4">
              <InputField register={register} errors={errors} placeholder="Password" registerType="password" type={isPasswordVisible ? "text" : "password"}/>
              <button type="button" className="btn btn-outline-secondary" onClick={passwordVisibility}>
                {isPasswordVisible ? <BiHide /> : <BiShow />}
              </button>
            </div>
            <div className='fw-semibold text-danger d-flex justify-content-start items-center'>
              {errors.password && <span>Password is required</span>}
            </div>
            <div className='fw-semibold text-danger d-flex justify-content-start items-center'>
              {loginError && <span>{loginError}</span>}
            </div>
            <Button type="submit" variant="primary" className="fw-semibold mt-4" size="md" active>
              LOGIN
            </Button>
            <p className="mt-4">Don't have an account? <Link to="/signup" className="fw-semibold text-primary text-decoration-none">  Signup </Link> </p>
          </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Login;