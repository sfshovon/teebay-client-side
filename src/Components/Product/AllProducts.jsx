import React from 'react';
import { Col, Row } from 'react-bootstrap';
import GetProducts from '../Utilities/GetProducts';
import PageTitle from '../Utilities/PageTitle';

const AllProducts = () => {
  return (
    <>
      <PageTitle title="All Products"/>
      <Row className="mt-5 justify-content-center">
        <Col md={8}>
          <h1 className="fw-normal text-center mb-4"> ALL PRODUCTS </h1>
          <GetProducts/>
        </Col>
      </Row>
    </>
  );
};

export default AllProducts;