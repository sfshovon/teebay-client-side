import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $address: String!
    $phone_number: String!
  ) {
    addUser(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      address: $address
      phone_number: $phone_number
    ) {
        id
        first_name
        last_name
        email
        address
        phone_number
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $title: String!
    $categories: String!
    $description: String!
    $product_price: Float!
    $rent_price: Float!
    $rent_type: String!
    $date_posted: String
    $created_by_id: Int!
    $views_count: Int
  ) {
    addProduct(
      title: $title
      categories: $categories
      description: $description
      product_price: $product_price
      rent_price: $rent_price
      rent_type: $rent_type
      date_posted: $date_posted
      created_by_id: $created_by_id
      views_count: $views_count
    ) {
        id
        title
        categories
        description
        product_price
        rent_price
        rent_type
        date_posted
        created_by {
          id
        }
        views_count
    }
  }
`;

export const DELETE_PRODUCT = gql`
mutation deleteProduct(
    $id: Int!
  ) {
    deleteProduct(
      id: $id
    ) {
      id
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation editProduct(
    $id: Int!
    $title: String
    $categories: String
    $description: String
    $product_price: Float
    $rent_price: Float
    $rent_type: String
  ) {
    editProduct(
      id: $id
      title: $title
      categories: $categories
      description: $description
      product_price: $product_price
      rent_price: $rent_price
      rent_type: $rent_type
    ) {
      id
      title
      categories
      description
      product_price
      rent_price
      rent_type
    }
  }
`;

export const BUY_PRODUCT = gql`
  mutation buyProduct(
    $id: Int!
    $bought_by: Int
  ) {
    buyProduct(
      id: $id
      bought_by: $bought_by
    ) {
      id
    }
  }
`;

export const RENT_PRODUCT = gql`
  mutation rentProduct(
    $product_id: Int
    $rented_by_id: Int
    $rent_start_date: String
    $rent_finish_date: String
  ) {
    rentProduct(
      product_id: $product_id
      rented_by_id: $rented_by_id
      rent_start_date: $rent_start_date
      rent_finish_date: $rent_finish_date
    ) {
      id
    }
  }
`;

export const COUNT_VIEWS = gql`
  mutation totalViews(
    $id: Int!
    $views_count: Int
  ) {
    totalViews(
      id: $id
      views_count: $views_count
    ) {
      id
    }
  }
`;