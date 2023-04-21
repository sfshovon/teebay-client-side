import React from 'react';
import { Col, Row } from 'react-bootstrap';
import GetProducts from '../../Utilities/GetProducts';

const BorrowedProduct = () => {
  return (
    <Row className="mt-5 justify-content-center">
      <Col md={8}>
        <GetProducts action="borrowed"/>
      </Col>
    </Row>
  );
};

export default BorrowedProduct;