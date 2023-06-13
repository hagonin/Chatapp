import React from 'react';
import { useFormik } from 'formik';
import './SearchForm.scss';
import { icons } from '@utils/constants';
import { Form } from '@components/Form/Control';

const FIELD_NAME = 'search';
const SearchForm: React.FC = () => {
  const {
    handleSubmit,
    errors,
    values,
    isSubmitting,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      [FIELD_NAME]: '',
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      values[FIELD_NAME] && handleSubmit();
    }, 400);
    return () => {
      clearTimeout(timeId);
    };
  }, [values[FIELD_NAME]]);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form__search">
        <input
          type="text"
          name={FIELD_NAME}
          id={FIELD_NAME}
          onChange={handleChange}
          placeholder="enter your keyword"
          value={values[FIELD_NAME]}
          autoComplete="off"
        />
        <button
          type="button"
          className="form__search-icon"
          onClick={() => resetForm}
        >
          <img
            src={values[FIELD_NAME] ? icons.clean : icons.search}
            alt="search"
          />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
