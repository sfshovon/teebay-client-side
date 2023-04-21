import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import MyNavbar from './Components/Navbar/MyNavbar';
import NotFound from './Components/NotFound/NotFound';
import AddProduct from './Components/Product/AddProduct';
import AllProducts from './Components/Product/AllProducts';
import EditProduct from './Components/Product/EditProduct';
import MyProduct from './Components/Product/MyProduct';
import Product from './Components/Product/Product';
import ProductHistory from './Components/Product/ProductHistory';
import SignUp from './Components/SignUp/SignUp';

const errorLink = onError(({ graphqlErrors }) => {
  graphqlErrors?.message(({ message }) => alert(`Graphql error ${message}`));
});
const link = from([
  errorLink,
  new HttpLink({uri: "https://teebay-server-side.vercel.app/graphql"})
]);
const client = new ApolloClient({ cache: new InMemoryCache(), link });
export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    if (window.location.pathname === "/login"){
      localStorage.removeItem('isLoggedIn');
    }
  }, [isLoggedIn]);
  const redirectToLogin = () => {
    const storedStatus = localStorage.getItem('isLoggedIn');
    return storedStatus ? null : <Navigate to="/login" replace />;
  };
  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <ApolloProvider client={client}>
        <MyNavbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/allProducts" element={<AllProducts/>}/>
          <Route path="/product/:id" element={ <Product />} />
          <>
            <Route path="/myProduct" element={isLoggedIn ? <MyProduct /> : redirectToLogin()}  />
            <Route path="/addProduct" element={isLoggedIn ? <AddProduct /> : redirectToLogin()}  />
            <Route path="/editProduct/:id" element={isLoggedIn ? <EditProduct /> : redirectToLogin()}  />
            <Route path="/productHistory" element={isLoggedIn ? <ProductHistory /> : redirectToLogin()}  />
          </>
          <Route path="*" element={<NotFound/>} ></Route>
        </Routes>
      </ApolloProvider>
      <ToastContainer position="top-right" autoClose={300} hideProgressBar={false} closeOnClick pauseOnHover draggable/>
    </UserContext.Provider>
  );
}

export default App;