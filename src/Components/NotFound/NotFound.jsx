import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../Utilities/PageTitle';

const NotFound = () => {
  return (
    <section className="d-flex align-items-center p-5" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container className="d-flex flex-column justify-content-center align-items-center text-center">
        <PageTitle title="Not Found"/>
        <div className="max-w-md">
          <h2 className="mb-4 fw-bolder display-1">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="lead mb-5 fw-bold">Sorry, we couldn't find this page.</p>
          <Link to="/">
            <Button variant="primary" size="md">Back to homepage</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;