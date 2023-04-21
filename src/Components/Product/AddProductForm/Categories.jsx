import React, { useState } from 'react';
import Select from 'react-select';
import { categories } from '../../Utilities/Categories';
import PrevNextButton from '../../Utilities/PrevNextButton';

const Categories = ({ currentPage, previousPage, nextPage, errors, isValid, setValue }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryError, setCategoryError] = useState(false); 
  const handleCategoryChange = (selectedOptions) => {
    const selectedCategories = selectedOptions.map((option) => option.value);
    const categoriesText = selectedCategories.join(", ");
    setSelectedCategories(selectedOptions);
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
  const isNextDisabled = selectedCategories.length === 0;
  return (
    <div>
      {currentPage === 2 && (
        <div className="mt-5 pt-5 text-center">
          <h1 className="fw-bold mb-2">Select categories</h1>
          <Select
            isMulti
            options={options}
            onChange={handleCategoryChange}
            placeholder="Choose Your Categories"
          />
          <div className='fw-semibold text-danger d-flex justify-content-start items-center'>
            {categoryError && <span>Please choose at least one category</span>}
          </div>
          <PrevNextButton previousPage={previousPage} nextPage={nextPage} isValid={isNextDisabled}/>
        </div>
      )}
    </div>
  );
};

export default Categories;