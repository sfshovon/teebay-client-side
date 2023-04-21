import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DELETE_PRODUCT } from '../Schemas/Mutations';
import { GET_PRODUCTS } from '../Schemas/Queries';
import GetProducts from '../Utilities/GetProducts';
import PageTitle from '../Utilities/PageTitle';

const MyProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleEdit = (product) => {
    navigate(`/editProduct/${product.id}`, { state: { product: product } });
  }
  const [deleteProduct, { error: deleteError }] = useMutation(DELETE_PRODUCT, {
    update(cache, { data: { deleteProduct } }) {
      const allExistingProducts = cache.readQuery({ query: GET_PRODUCTS });
      const newlyAddedProduct = allExistingProducts.allProducts.filter(
        (product) => parseInt(product.id) !== parseInt(deleteProduct.id)
      );
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: { allProducts: newlyAddedProduct },
      });
    },
  }); 
  const deletedProduct = async (id) => {
    await deleteProduct({
      variables: {
        id: parseInt(id)
      },
      refetchQueries: [{ query: GET_PRODUCTS }],
    });
    toast("Product Has Been Deleted")
    if (deleteError) {
      console.log(deleteError);
    }
    setShowModal(false)
  };
  return (
    <div>
      <PageTitle title="My Products"/>
      <Row className="mt-5 justify-content-center">
        <Col md={8}>
          <h1 className="fw-normal text-center mb-4"> MY PRODUCTS </h1>
          <GetProducts showModal={showModal} setShowModal={setShowModal} deletedProduct={deletedProduct} handleEdit={handleEdit} action="myProduct"/>
          <div className="mt-4 mb-5 text-end">
            <Link to="/addProduct">
              <Button variant="primary">Add Product</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MyProduct;