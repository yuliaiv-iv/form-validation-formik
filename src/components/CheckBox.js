import React from 'react';
import { useField } from 'formik';

const CheckBox = ({ ...props }) => {

  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label
        className="form__field"
      >
        <input
          className="form__input form__input_checkbox"
          type="checkbox"
          {...field}
          {...props}
        />
        <span className="form__checkbox-text">Agree to <a className="form__checkbox-accent" href='#'>terms and conditions</a></span>
      </label>
      {meta.touched && meta.error && (
        <span className="form__item-error">
          {meta.error}
        </span>
      )}
    </>
  );
};

export default CheckBox;
