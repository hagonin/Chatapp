import React from 'react';
import { imgs } from '@utils/constants';
import './Signup.scss';
import Form from '@components/Form/Control/Form';
import TextField from '@components/Form/Control/TextField';
import PhoneField from '@components/Form/Control/PhoneField';
import PasswordField from '@components/Form/Control/PasswordField';
import CheckBoxField from '@components/Form/Control/CheckBoxField';
import Button from '@components/UI/Button';

const Signup: React.FC = () => {
  return (
    <div className="signup">
      <h1 className="signup__title">Talkie - Register for a free account</h1>
      <Form>
        <TextField
          name="name"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          // errorMessage="Please enter your phone"
        />
        <PhoneField
          name="phone"
          label="Mobile Phone"
          placeholder="Enter your mobile phone"
          // errorMessage="Please enter your phone"
        />
        <PasswordField
          name="password"
          label="Password"
          placeholder="Enter your password"
          // errorMessage="Please enter your password"
        />
        <PasswordField
          name="confirm-password"
          label="Confirm Password"
          placeholder="Re-enter password"
          // errorMessage="Please enter your confirm password"
        />
        <CheckBoxField
          name="consent"
          options={{ label: 'I agree to the terms and conditions' }}
        />
        <Button type="submit">Register</Button>
        <div className="social-group">
          <Button>
            <img src={imgs.fb} alt="fb" />
            Facebook
          </Button>
          <Button>
            <img src={imgs.google} alt="fb" />
            Google
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
