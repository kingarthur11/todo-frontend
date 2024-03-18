import React, { useState, useEffect } from "react";
import axios from "axios";

const FormValidation = ( ) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);

  const resetForm = () => {
    setValues({
      comment: "",
      marchant: "",
      status: "",
      total: "",
      date_applied: "",
    });
  };

  const onInputChange = (e) => {
    e.persist();
    let name = e.target.name;
    let value = e.target.value;
    const limitedValue = name === 'description' ? value.split(/\s+/).slice(0, 15).join(' ') : value;
    setValues({
      ...values,
      [name]: limitedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    console.log(values)
    setIsSubmitted(true);
  };

  return {
    values,
    errors,
    onInputChange,
    handleSubmit,
    loading,
    show,
    isSubmitted,
    setValues
  };
};

export default FormValidation;

export const validate = (values) => {
  const errors = {};
  if (values.name.length <= 3) {
    errors.name = "value is reqired";
  }
  if (values.description == "") {
    errors.description = "value is reqired";
  }
  if (values.category == "") {
    errors.category = "value is reqired";
  }

  return errors;
};
