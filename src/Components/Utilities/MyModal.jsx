import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyModal = ({ showModal, setShowModal, onDeleteConfirm, onPurchaseConfirm, onRentConfirm, product, action}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const handleDeleteProduct = () => {
    onDeleteConfirm(product.id);
    setShowModal(false);
  };
  const handleBuyProduct = () => {
    onPurchaseConfirm(product.id)
    setShowModal(false);
  };
  const handleRentProduct = () => {
    onRentConfirm(product.id, startDate, endDate)
    setShowModal(false);
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const renderModalBody = () => {
    switch (action) {
      case 'delete':
        return (
          <Modal.Body>
            <h3>Are you sure you want to delete this product {product?.title}?</h3>
          </Modal.Body>
        );
      case 'buy':
        return (
          <Modal.Body>
            <h3>Are you sure you want to buy this product {product?.title}?</h3>
          </Modal.Body>
        );
      case 'rent':
        return (
          <Modal.Body>
            <Form className="d-flex justify-content-center align-items-center gap-3">
              <div className="me-2">
                <label className="form-label fw-bold">From</label>
                <DatePicker selected={startDate} onChange={handleStartDateChange} required/>
              </div>
              <div>
                <label className="form-label fw-bold">To</label>
                <DatePicker selected={endDate} onChange={handleEndDateChange} required/>
              </div>
            </Form>
          </Modal.Body>
        );
      default:
        return null;
    }    
  };
  const renderModalFooter = () => {
    if (action === 'delete') {
      return (
        <Modal.Footer className="mt-5">
          <Button variant="danger" onClick={() => setShowModal(false)}>No</Button>
          <Button variant="primary" onClick={handleDeleteProduct}>Yes</Button>
        </Modal.Footer>
      );
    } else if (action === 'buy') {
      return (
        <Modal.Footer className="mt-5">
          <Button variant="danger" onClick={() => setShowModal(false)}>No</Button>
          <Button variant="primary" onClick={handleBuyProduct}>Yes</Button>
        </Modal.Footer>
      );
    } else if (action === 'rent') {
      return (
        <Modal.Footer className="mt-5">
          <Button variant="danger" onClick={() => setShowModal(false)}>Go Back</Button>
          <Button variant="primary" onClick={handleRentProduct} disabled={!startDate || !endDate}>Confirm Rent</Button>
        </Modal.Footer>
      );
    }
  };
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{action === 'delete' ? 'Delete Product' : (action === 'buy' ? 'Buy Product' : 'Rental Period')}</Modal.Title>
      </Modal.Header>
      {renderModalBody()}
      {renderModalFooter()}
    </Modal>
  );
};

export default MyModal;