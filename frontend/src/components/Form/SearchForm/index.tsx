import React from 'react';
import './SearchForm.scss';
import useForm from '@hooks/useForm';
import { icons } from '@utils/constants';
import { Form } from '../Control';

const FIELD_NAME = 'search';
const SearchForm: React.FC = () => {
  const { values, onSubmit, onChange, reset } = useForm({
    initValues: {
      [FIELD_NAME]: '',
    },
    onCallApi: (data: {}) => {
      const res = new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 0);
      });
      return res.then(data => console.log(data));
    },
    resetAfterSubmit: false,
  });

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      values[FIELD_NAME] && onSubmit();
    }, 400);
    return () => {
      clearTimeout(timeId);
    };
  }, [values[FIELD_NAME]]);

  return (
    <Form onSubmit={onSubmit}>
      <div className="form__search">
        <input
          type="text"
          name={FIELD_NAME}
          id={FIELD_NAME}
          onChange={onChange}
          placeholder="enter your keyword"
          value={values[FIELD_NAME]}
          autoComplete="off"
        />
        <button type="button" className="form__search-icon" onClick={reset}>
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
