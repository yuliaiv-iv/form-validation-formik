import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import CheckBox from './CheckBox';
import { postForm } from '../utils/api';

function SubmitForm() {

  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const [isSubmitingError, setIsSubmitingError] = useState("");
  const [isSubmitingButton, setIsSubmitingButton] = useState("Submit form");

  return (
    <section className="form">
      <h3 className="form__title">
        Form
      </h3>
      <p className="form__paragraph">
        Fill out this form to become a part of the project
      </p>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          text: '',
          terms: false
        }}

        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "Your name must be at least 3 characters*")
            .max(60, "Your name cannot be more than 50 characters*")
            .required("Required field*"),
          email: Yup.string()
            .email("Invalid email address*")
            .required("Required field*"),
          phone: Yup.string()
            .matches(phoneRegExp, "Invalid phone number*")
            .required("Required field*"),
          text: Yup.string()
            .min(10, "Poem must be at least 10 characters*")
            .max(500, "Poem cannot be more than 500*")
            .required("Required field*"),
          terms: Yup.bool()
            .oneOf([true], "Please accept terms*")
        })}

        onSubmit={(values, { setSubmitting, resetForm }) => {
          postForm(values)
            .then(() => {
              setTimeout(() => {
                setSubmitting(false);
                setIsSubmitingError('');
                setIsSubmitingButton('Form submitted');
                resetForm('');
                alert((JSON.stringify(values, null, 2)));
              }, 1500)
            })
            .then(() => {
              setTimeout(() => {
                setIsSubmitingButton('Submit another form');
              }, 3000)
            })
            .catch((err) => {
              setTimeout(() => {
                console.log(err);
                setIsSubmitingError('Ops something went wrong, try again later');
                resetForm('');
              }, 1500)
            })
        }}
      >
        {formik => (
          <Form
            className="form__fields"
            noValidate
          >
            <FormInput
              name="name"
              type="text"
              placeholder="Name"
            />
            <FormInput
              name="phone"
              type="tel"
              placeholder="Phone  +1 XXX XXX XX XX"
            />
            <FormInput
              name="email"
              type="email"
              placeholder="Email"
            />
            <FormInput
              name="text"
              type="text"
              placeholder="Poem"
            />
            <CheckBox
              name="terms"
            />
            <button
              className="form__button button"
              type="submit"
            >
              {formik.isSubmitting ? 'Submitting...' : `${isSubmitingButton}`}
            </button>
            <span
              className="form__button-error"
            >
              {isSubmitingError}
            </span>
          </Form>
        )}
      </Formik>
    </section >
  )
}
export default SubmitForm;

