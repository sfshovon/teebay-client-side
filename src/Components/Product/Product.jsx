import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';
import NotFound from '../NotFound/NotFound';
import { BUY_PRODUCT, RENT_PRODUCT } from '../Schemas/Mutations';
import { GET_PRODUCTS, GET_RENTED_PRODUCTS } from '../Schemas/Queries';
import MyModal from '../Utilities/MyModal';

const Product = () => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [productExists, setProductExists] = useState(true);
  const { isLoggedIn } = useContext(UserContext);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { error, loading, data } = useQuery(GET_PRODUCTS);
  const userID = JSON.parse(localStorage.getItem('userID'));
  const [buyProduct, { error: buyError }] = useMutation(BUY_PRODUCT);
  const [rentProduct, { error: rentError }] = useMutation(RENT_PRODUCT);
  const boughtProduct = async (id) => {
    await buyProduct({
      variables: {
        id: parseInt(id),
        bought_by: parseInt(userID)
      },
      refetchQueries: [{ query: GET_PRODUCTS }]
    });
    toast("Product Has Been Bought")
    if (buyError) {
      console.log(buyError);
    }
    setShowBuyModal(false)
  };
  const rentedProduct = async (id, rentStartDate, rentFinishDate) => {
    await rentProduct({
      variables: {
        product_id: parseInt(id),
        rented_by_id: parseInt(userID),
        rent_start_date: rentStartDate,
        rent_finish_date: rentFinishDate
      },
      refetchQueries: [{ query: GET_PRODUCTS }, {query: GET_RENTED_PRODUCTS }]
    });
    toast("Product Has Been Rented");
    if (rentError) {
      console.log(rentError);
    }
    setShowRentModal(false);
  };
  const checkRented = isLoggedIn && product?.rent_info?.some(rp => rp?.rented_by?.id === parseInt(userID));
  const checkBought = isLoggedIn && product?.bought_by?.some(user => user?.id === parseInt(userID))


  useEffect(() => {
    if (data) {
      const individualProduct = data.allProducts.filter(ip => ip?.id === parseInt(id));
      if (individualProduct.length > 0) {
        setProduct(individualProduct[0]);
        setProductExists(true);
      } else {
        setProductExists(false);
      }
    }
  }, [data, id]);
  if (!productExists) { // render NotFound component if product doesn't exist
    return <NotFound/>;
  }
  if(loading) {
    return <div>Loading...</div>;
  }
  if(error) {
    return <div>Error: {error.message}</div>;
  }
  const options = { 
    timeZone: 'UTC',
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    second: 'numeric',
    hour12: true
  };
  const rentStart = product?.rent_info?.find(info => info?.rented_by?.id === parseInt(userID))?.rent_start_date;
  const rentStartConvert = new Date(rentStart);
  const rentStartDate = rentStartConvert.toLocaleString('en-GB', options);
  const rentFinish = product?.rent_info?.find(info => info?.rented_by?.id === parseInt(userID))?.rent_finish_date;
  const rentFinishConvert = new Date(rentFinish);
  const rentFinishDate = rentFinishConvert.toLocaleString('en-GB', options);
  return (
    <Row className="mt-5 justify-content-center">
      <Col md={8}>
        <div className="mt-3 mb-5 pb-5">
          <div className="px-5 py-2">
            <Row className="justify-content-between align-items-center mb-3">
              <Col md={12}>
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="fw-semibold">{product?.title}</h2>
                  <div>
                  <ul> 
                  {
                    checkBought &&
                    <h6 className="fw-semibold">You already bought this product</h6>
                  }
                  </ul>
                  <ul>
                  { 
                    checkRented &&
                    <div>
                      <h6 className="fw-semibold">You already rented this product</h6>
                      <h6 className="fw-semibold"> Rented from: {rentStartDate} </h6>
                      <h6 className="fw-semibold"> Till: {rentFinishDate} </h6>
                    </div>
                  }
                  </ul>
                  </div>
                </div>
              </Col>         
            </Row>
            <Row>
              <Col>
                <h6 className="mt-3 fw-semibold">Categories: {product?.categories}</h6>
                <h6 className="mt-3 fw-semibold">Price: {product?.product_price} | Rent: {product?.rent_price} {product?.rent_type}</h6>
                <h6 className="mt-4 fw-semibold">{product?.description}</h6>
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
        </div>
        { 
          product?.created_by !== userID && isLoggedIn &&
          <div className="mt-5 d-flex justify-content-end align-items-center gap-3">
            <Button variant="primary" onClick={() => setShowBuyModal(true)}> Buy </Button>
            <Button variant="primary" onClick={() => setShowRentModal(true)} disabled = {checkRented}> Rent </Button>
          </div>
        }
        <MyModal showModal={showBuyModal} setShowModal={setShowBuyModal} product={product} action="buy" onPurchaseConfirm={boughtProduct} />
        <MyModal showModal={showRentModal} setShowModal={setShowRentModal} product={product} action="rent" onRentConfirm={rentedProduct}/>
      </Col>        
    </Row>
  );
};
export default Product;
