import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PageTitle from '../Utilities/PageTitle';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <PageTitle title="Home" />
      <Container className="py-5">
        <Row className="justify-content-center align-items-center">
          <Col md={8} lg={6} className="bg-white rounded p-4">
            <h1 className="mb-4">Welcome to Teebay by SFS!</h1>
            <p className="lead mb-4">
              Teebay is a product renting and buying/selling application that needs to be created with a Front End (FE), BackEnd (BE) and a DataBase (DB). It is requested to create some preliminary features such as user registration and login, and then create a product adding, editing and deleting feature, keeping in mind the wireframe design.
              The product will have categories such as electronics, furniture, home appliances, sporting goods, outdoor, and toys. The final step involves creating features like listing all products, buying, selling, and renting products, and displaying all products bought/sold/borrowed/lent by the user. The technologies required are React for FE, a BE framework of choice with GraphQL, and Prisma ORM with Postgres. The UI can be designed using MaterialUI, Mantine or Bootstrap.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;