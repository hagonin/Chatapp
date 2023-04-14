import React from 'react';
import './MessageForm.scss';
import { Form } from '../Control';
import useForm from '@hooks/useForm';
import { icons } from '@utils/constants';

const FIELD_NAME = 'message';
const MessageForm = () => {
  const { values, onSubmit, onChange } = useForm({
    initValues: {
      [FIELD_NAME]: '',
    },
    onCallApi: data => {
      const res = new Promise(resolve => {
        resolve(data);
      });
      return res.then(data => console.log(data));
    },
  });
  return (
    <Form onSubmit={onSubmit}>
      <div className="message">
        <button>
          <img src={icons.file} alt="message" />
        </button>
        <input
          id={FIELD_NAME}
          name={FIELD_NAME}
          type="text"
          placeholder="Type your message here"
          value={values[FIELD_NAME]}
          onChange={onChange}
          autoComplete="off"
        />
        <button>
          <img src={icons.messageSymbol} alt="message" />
        </button>

        <button>
          <img src={icons.messageSendIcon} alt="message" />
        </button>
      </div>
    </Form>
  );
};

export default MessageForm;
