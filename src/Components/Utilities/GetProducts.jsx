import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { COUNT_VIEWS } from '../Schemas/Mutations';
import { GET_PRODUCTS } from '../Schemas/Queries';
import MyModal from './MyModal';

const GetProducts = ({showModal, setShowModal, deletedProduct, handleEdit, action}) => {
  const { error: productError, loading: productLoading, data: productData } = useQuery(GET_PRODUCTS);
  // const { error: userError, loading: userLoading, data: userData } = useQuery(GET_USERS);
  // const { error: rentError, loading: rentLoading, data: rentData } = useQuery(GET_RENTED_PRODUCTS);
  const { isLoggedIn } = useContext(UserContext);
  const [products, setProducts] = useState();
  const userID = JSON.parse(localStorage.getItem('userID'));
  const navigate = useNavigate();
  const [addCount, { error: countError }] = useMutation(COUNT_VIEWS);
  const handleNavigate = (productID) => {
    const newViewsCount = products.find(product => product?.id === productID).views_count + 1;
    addCount({
      variables: {
        id: productID,
        views_count: newViewsCount || undefined
      },
      refetchQueries: [{query: GET_PRODUCTS}],
    });
    navigate(`/product/${productID}`);
    if(countError){
      console.log(countError)
    }
  }
  useEffect(() => {  
    if (productData) {
      switch (action) {
        case "bought":
          const boughtProduct = productData?.allProducts.filter(product => product?.bought_by?.some(user => user?.id === parseInt(userID)));
          setProducts(boughtProduct);
          break;
        case "sold":
          const soldProduct = productData?.allProducts.filter(product => product?.created_by?.id === parseInt(userID) && product.bought_by?.length > 0).map(sp => sp);
          setProducts(soldProduct);
          break;
        case "borrowed":
          // const borrowedProduct = rentData?.allRentInfo.filter(rented => rented?.rented_by?.id === parseInt(userID)).map(bp => bp?.product);
          const borrowedProduct = productData?.allProducts.filter(product => product?.rent_info?.some(user => user?.rented_by?.id === parseInt(userID)))
          setProducts(borrowedProduct);
          break;
        case "lent":
          // const lentProduct = rentData?.allRentInfo.filter(lentProduct => lentProduct?.rented_by?.id !== parseInt(userID) && lentProduct?.product?.created_by?.id === parseInt(userID)).map(lp => lp?.product);
          const lentProduct = productData?.allProducts.filter(product => product?.created_by?.id === parseInt(userID) && product?.rent_info?.some(user => user?.rented_by?.id !== parseInt(userID))
          );
          setProducts(lentProduct);
          break;
        case "myProduct":
          const myProduct = productData?.allProducts?.filter(product => product?.created_by?.id === parseInt(userID));
          setProducts(myProduct);
          break;
        default:
          const notMyProduct = productData?.allProducts?.filter(product => product?.created_by?.id !== userID);
          setProducts(notMyProduct);
      }
    }
  }, [productData, userID, action]);
  if(productError) {
    return <div>Error: {productError.message}</div>;
  }
  if(productLoading) {
    return <div>Loading...</div>;
  }
  // if(productError || userError || rentError) {
  //   return <div>Error: {productError.message || userError.message || rentError.message}</div>;
  // }
  // if(productLoading || userLoading || rentLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div>
      {products?.map((product, index) => {
          return(
            <div className="my-4" key={`product-${index}`}> 
              <div className="border border-secondary-subtle border-3 px-5 py-2">
                <Row className="justify-content-between align-items-center mb-3">
                  <Col md={["bought", "sold", "borrowed", "lent"].includes(action) ? 12 : 10}>
                  <div className={["bought", "sold", "borrowed", "lent"].includes(action) ? "d-flex justify-content-between align-items-center" : ""}>
                    <h2 className="fw-semibold">{product?.title}</h2>
                    {
                      action==="bought" && isLoggedIn && 
                      <h6 className="fw-semibold">Bought From: {product?.created_by?.first_name} {product?.created_by?.last_name}</h6>
                    }
                    {
                      action==="sold" && isLoggedIn &&
                        <h6 className="fw-semibold">Sold To:
                          <ol>
                            {product?.bought_by.map(user => (
                              <li key={user?.id}>{user?.first_name} {user?.last_name}</li>
                            ))}
                          </ol>
                        </h6>
                    }
                    {
                      action==="borrowed" && isLoggedIn && 
                      <h6 className="fw-semibold">Borrowed From: {product?.created_by?.first_name} {product?.created_by?.last_name}</h6>
                    }
                    {
                      action === "lent" && isLoggedIn &&
                        <h6 className="fw-semibold">Rented By:
                          <ol>
                            {product?.rent_info?.filter(rp => rp?.rented_by)?.map(rentInfo => (
                              <li key={rentInfo?.id}>
                                {rentInfo?.rented_by?.first_name} {rentInfo?.rented_by?.last_name}
                              </li>
                            ))}
                          </ol>
                        </h6>
                    }
                  </div>  
                  </Col>
                  { 
                    setShowModal && handleEdit &&
                    <>
                      <Col md={1} className="text-end">
                        <FaEdit size="1.5em" onClick={() => handleEdit(product)} />
                      </Col>
          
                      <Col md={1}>
                        <FaTrash size="1.5em" onClick={() => setShowModal(product?.id)} />
                      </Col>
                    </>
                  }
                </Row>
                <Row>
                  <Col>
                    <h6 className="mt-3 fw-semibold">Categories: {product?.categories}</h6>
                    <h6 className="mt-3 fw-semibold">Price: {product?.product_price} Rent: {product?.rent_price} {product?.rent_type}</h6>
                    <h6 className="mt-4 fw-semibold">{product?.description}
                    {
                      !handleEdit &&
                      <span className="text-primary" onClick={() => handleNavigate(product?.id)}> More Details </span> 
                    }
                    </h6>
                  </Col>
                </Row>
                <Row className="justify-content-between align-items-center mt-4">
                  <Col md={10}>
                    <h6 className="fw-semibold">Date posted: {product?.date_posted}</h6>
                  </Col>
                  <Col md={2} className="text-end">
                    <h6 className="fw-semibold">{product?.views_count} views</h6>
                  </Col>
                </Row>
              </div>
              { 
                showModal === product?.id && 
                <MyModal showModal={showModal} setShowModal={setShowModal} onDeleteConfirm={deletedProduct} product={product} action="delete"/>
              }  
            </div> 
          ) 
       })}
    </div>
  );
};

export default GetProducts;
