import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ADD_PRODUCT } from "../Schemas/Mutations";
import { GET_PRODUCTS } from "../Schemas/Queries";
import CurrentDate from "../Utilities/CurrentDate";
import PageTitle from "../Utilities/PageTitle";
import Categories from "./AddProductForm/Categories";
import Description from "./AddProductForm/Description";
import Price from "./AddProductForm/Price";
import Review from "./AddProductForm/Review";
import Title from "./AddProductForm/Title";

const AddProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const previousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const { register, setValue, handleSubmit, formState: {errors, isValid}, watch } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const userID = localStorage.getItem('userID');
  const finalDate = CurrentDate();
  const [addProduct, { error: addError }] = useMutation(ADD_PRODUCT);
  const createProduct = async(data) => {
    console.log(data)
    await addProduct({
      variables: {
        title: data?.title,
        categories: data?.categories,
        description: data?.description,
        product_price: parseFloat(data?.product_price),
        rent_price: parseFloat(data?.rent_price),
        rent_type: data?.rent_type,
 		    date_posted: finalDate,
 		    created_by_id: parseInt(userID),
        views_count: 0
      },
      refetchQueries: [{query: GET_PRODUCTS}], //instantly re-render the UI
    })
    toast("Product Has Been Added")
    navigate(`/myProduct`);
    if(addError){
      console.log(addError)
    }
  }
  return (
    <Container className="my-5">
      <PageTitle title="Add Product"/>
      <Form onSubmit={handleSubmit(createProduct)}>
        <Title currentPage={currentPage} register={ register} errors={errors} nextPage={nextPage} isValid={isValid}/>
        <Categories currentPage={currentPage} register={ register} errors={errors} previousPage={previousPage} nextPage={nextPage} isValid={isValid} setValue={setValue}/>
        <Description currentPage={currentPage} register={ register} errors={errors} previousPage={previousPage} nextPage={nextPage} isValid={isValid}/>
        <Price currentPage={currentPage} register={ register} errors={errors} previousPage={previousPage} nextPage={nextPage} isValid={isValid} watch={watch}/>
        <Review currentPage={currentPage} previousPage={previousPage} watch={watch}/>
      </Form>
    </Container>
  );
};

export default AddProduct;

