import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EDIT_PRODUCT } from '../Schemas/Mutations';
import { GET_PRODUCTS } from '../Schemas/Queries';
import { categories } from '../Utilities/Categories';
import InputField from '../Utilities/InputField';
import PageTitle from '../Utilities/PageTitle';

const EditProduct = () => {
  const { register, setValue, handleSubmit, formState: { errors }, watch } = useForm();
  const [categoryError, setCategoryError] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();
  const product = location?.state?.product;
  const [editProduct, { error: editError }] = useMutation(EDIT_PRODUCT);
  const editedProduct = async (data) => {
    console.log(data)
    await editProduct({
      variables: {
        id: product?.id,
        title: data?.title,
        categories: data?.categories,
        description: data?.description,
        product_price: parseFloat(data?.product_price),
        rent_price: parseFloat(data?.rent_price),
        rent_type: data?.rent_type
      },
      refetchQueries: [{ query: GET_PRODUCTS }],
    });
    toast("Product Has Been Updated")
    if(editError){
      console.log(editError)
    }
    navigate(`/myProduct`);
  }
  const handleCategoryChange = (selectedOptions) => {
    const selectedCategories = selectedOptions.map((option) => option.value);
    const categoriesText = selectedCategories.join(", ");
    setValue('categories', categoriesText);
    if (selectedCategories.length === 0) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
  };
  const options = categories.map((category) => ({
    value: category.value,
    label: category.label,
  }));
  const categoriesString = product.categories;
  const categoriesArray = categoriesString.split(", ");
  const defaultValues = categoriesArray.map((category) => ({
    value: category,
    label: category,
  }));
  const [isRentPriceValid, setIsRentPriceValid] = useState(true);
  const productPrice = watch("product_price");
  const rentPrice = watch("rent_price");
  useEffect(() => {
    if(parseFloat(rentPrice) >= parseFloat(productPrice)){
      setIsRentPriceValid(false)
    }
    else{
      setIsRentPriceValid(true)
    }
  }, [rentPrice, productPrice]);
  const isFormValid = categoryError || !isRentPriceValid || Object.keys(errors).length !== 0
  return (
    <div className="px-5 mx-5">
      <PageTitle title="Edit Product"/>
      <Form onSubmit={handleSubmit(editedProduct)}> 
        <div className="mt-5 pt-5 px-5 mx-5">
          <h5 className="fw-semibold mb-2"> Title </h5>
          <Form.Group className="mb-2">
            <InputField register={register} errors={errors} registerType="title" type="text" defaultValue={product?.title} action="title"/>
          </Form.Group> 
        </div>
        <div className="mt-2 px-5 mx-5">
          <h5 className="fw-semibold mb-2"> Categories </h5>
          <Form.Group className="mb-2">
            <Select
              isMulti
              options={options}
              onChange={handleCategoryChange}
              placeholder="Choose Your Categories"
              defaultValue={defaultValues}
            />
            <div className='fw-semibold text-danger d-flex justify-content-start items-center'>
              {categoryError && <span>Please choose at least one category</span>}
            </div>
          </Form.Group> 
        </div>
        <div className="mt-2 px-5 mx-5">
          <h5 className="fw-semibold mb-2"> Description </h5>
          <Form.Group className="mb-2">
            <InputField register={register} errors={errors} registerType="description" as="textarea" defaultValue={product?.description} action="description"/>
          </Form.Group> 
        </div>
        <div className="mt-4 px-5 mx-5 d-flex justify-content-start gap-5">
          <div className="product_price">
            <h5 className="fw-semibold mb-2"> Price </h5>
            <Form.Group className="mb-2">
              <InputField register={register} errors={errors} registerType="product_price" type="number" defaultValue={parseFloat(product?.product_price)} action="number"/>
            </Form.Group> 
          </div>
          <div className="d-flex mx-2 justify-content-start gap-3">
            <div className="rent_price">
              <h5 className="fw-semibold mb-2"> Rent </h5>
              <Form.Group className="mb-2">
                <InputField register={register} errors={errors} registerType="rent_price" type="number" defaultValue={parseFloat(product?.rent_price)} action="number"/>
                <div className='fw-semibold text-danger d-flex justify-content-start items-center'>
                  {!isRentPriceValid && <div className='fw-semibold text-danger d-flex justify-content-start items-center'>Rent price cannot be greater than product price</div>}
                </div>
              </Form.Group> 
            </div>
            <div className="rent_type">
              <h5 className="fw-semibold mb-2"> Choose Renting Period </h5>
              <Form.Group className="mb-2">
                 <InputField register={register} errors={errors} registerType="rent_type" as="select" defaultValue={product?.rent_type}>
                  <option value="Hourly">Per Hour</option>
                  <option value="Daily">Per Day</option>
                  <option value="Weekly">Per Week</option>
                  <option value="Monthly">Per Month</option>
                </InputField>
              </Form.Group> 
            </div>
          </div>
        </div>
        <div className="mt-4 mb-5 px-5 mx-5 d-flex justify-content-between align-items-center">
          <Link to="/myProduct"><Button variant="primary">Back</Button></Link>
          <Button variant="primary" type="submit" disabled={isFormValid}>
            Edit Product
          </Button>
        </div>
      </Form>       
    </div>
  );
};

export default EditProduct;