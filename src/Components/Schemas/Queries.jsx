import { gql } from "@apollo/client";

export const GET_USERS = gql`
query{
  allUsers{
    id,
    first_name,
    last_name,
    address,
    email,
    password,
    phone_number
    bought_products{
      id
    }
    rented_products{
      id
      rented_by{
        id
      }
    }
  }
}
`
export const GET_PRODUCTS = gql`
  query {
    allProducts {
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
        first_name
        last_name
        email
        address
        phone_number
      }
      bought_by {
        id
        first_name
        last_name
        email
        address
        phone_number
      }
      rent_info {
        id
        rented_by{
          id
          first_name
          last_name
          email
          address
          phone_number
        }
        rent_start_date
        rent_finish_date
      }
      views_count
    }
  }
`;

export const GET_RENTED_PRODUCTS = gql`
  query {
    allRentInfo {
      id
      product {
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
          first_name
          last_name
          email
          address
          phone_number
        }
        bought_by{
          id
          first_name
          last_name
          email
          address
          phone_number
        }
      }
      rented_by{
        id
        first_name
        last_name
        email
        address
        phone_number
      }
      rent_start_date
      rent_finish_date
    }
  }
`;