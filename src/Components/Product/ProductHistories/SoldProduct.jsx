import React from 'react';
import { Col, Row } from 'react-bootstrap';
import GetProducts from '../../Utilities/GetProducts';

const SoldProduct = () => {
  return (
    <Row className="mt-5 justify-content-center">
      <Col md={8}>
        <GetProducts action="sold"/>
      </Col>
    </Row>
  );
};

export default SoldProduct;