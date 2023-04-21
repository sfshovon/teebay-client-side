import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PageTitle from '../Utilities/PageTitle';
import BorrowedProduct from './ProductHistories/BorrowedProduct';
import BoughtProduct from './ProductHistories/BoughtProduct';
import LentProduct from './ProductHistories/LentProduct';
import SoldProduct from './ProductHistories/SoldProduct';

const ProductHistory = () => {
  return (
    <div>
      <PageTitle title="Product History"/>
      <Tabs
        defaultActiveKey="bought"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="bought" title="Bought">
          <BoughtProduct/>
        </Tab>
        <Tab eventKey="sold" title="Sold">
          <SoldProduct/>
        </Tab>
        <Tab eventKey="borrowed" title="Borrowed">
          <BorrowedProduct/>
        </Tab>
        <Tab eventKey="lent" title="Lent">
          <LentProduct/>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductHistory;