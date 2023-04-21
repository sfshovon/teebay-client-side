import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';

const MyNavbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const userID = localStorage.getItem('userID');
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const handleLogout = () => {
    if (user) {
      setIsLoggedIn(false);
      toast(`${user.first_name} Has Been Logged Out Successfully!`);
    }
    localStorage.removeItem('userID');
    localStorage.removeItem('currentUser');
  };
  useEffect(() => {
    if (userID) {
      setIsLoggedIn(true);
      if (window.location.pathname === "/login") {
        setIsLoggedIn(false);
        localStorage.removeItem('userID');
        localStorage.removeItem('currentUser');
      }
    } 
    else {
      setIsLoggedIn(false);
    }
  }, [userID, setIsLoggedIn]);
  const loggedInLinks = (
    <>
      <Link to="/myProduct" className="text-decoration-none">
        My Product
      </Link>
      <Link to="/productHistory" className="text-decoration-none">
        Product History
      </Link>
      <Link to="/login" onClick={() => handleLogout(user.id)} className="text-decoration-none">
        Logout
      </Link>
    </>
  );
  const loggedOutLink = (
    <Link to="/login" className="text-decoration-none">
      Login
    </Link>
  );
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand>Teebay</Navbar.Brand>
          <Nav className="d-flex justify-content-center align-items-center gap-5 fw-semibold">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
            <Link to="/allProducts" className="text-decoration-none">
              Products
            </Link>
            { isLoggedIn ? loggedInLinks : loggedOutLink }
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
