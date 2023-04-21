import React from 'react';
import { Col, Row } from 'react-bootstrap';
import GetProducts from '../../Utilities/GetProducts';

const LentProduct = () => {
  return (
    <Row className="mt-5 justify-content-center">
      <Col md={8}>
       <GetProducts action="lent"/>
      </Col>
    </Row>
  );
};

export default LentProduct;