import React from 'react';
import { imgs } from '@utils/constants';
import './Signup.scss';
import Form from '@components/Form/Control/Form';
import TextField from '@components/Form/Control/TextField';
import PhoneField from '@components/Form/Control/PhoneField';
import PasswordField from '@components/Form/Control/PasswordField';
import CheckBoxField from '@components/Form/Control/CheckBoxField';
import Button from '@components/UI/Button';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [showSignUpByPhoneForm, setShowSignUpByPhoneForm] =
    React.useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="authenLayout-form signup">
        <button
          className="form__type-login-btn"
          onClick={() => setShowSignUpByPhoneForm(!showSignUpByPhoneForm)}
        >
          {`Sign up with ${showSignUpByPhoneForm ? 'email' : 'mobile phone'}`}
        </button>
        <Form>
          {/* <TextField
            name="username"
            label="Username"
            type="text"
            placeholder="Enter your name"
            errorMessage="Please enter your name"
          /> */}
          {showSignUpByPhoneForm ? (
            <PhoneField
              name="phone"
              label="Mobile Phone"
              placeholder="Enter your mobile phone"
              errorMessage="Please enter your phone"
            />
          ) : (
            <TextField
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              errorMessage="Please enter your phone"
            />
          )}

          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter your password"
            errorMessage="Please enter your password"
          />
          {/* <PasswordField
            name="confirm-password"
            label="Confirm Password"
            placeholder="Re-enter password"
            // errorMessage="Please enter your confirm password"
          /> */}
          {/* <CheckBoxField
            name="consent"
            options={{ label: 'I agree to the terms and conditions' }}
          /> */}
          <Button type="submit" typeClass="button--primary">
            Register
          </Button>
          <span className="separate separate--signup"></span>
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
          <span className="form__already-btn">
            Already have an account ?
            <button onClick={() => navigate('/login')}>Login</button>
          </span>
          <span className="form__consent">
            By signing up to create an account I accept Talkie's
            <span className="form__consent-link">
              Terms of Use and Privacy Policy
            </span>
          </span>
        </Form>
      </div>
      <div>
        <h1 className="authenLayout__title">
          <span>Talkie</span>-Create account
        </h1>
        <span className="authenLayout__subtitle">
          Connect with your friend today
        </span>
        <img src={imgs.signup} alt="bacgkround" className="authenLayout__img" />
      </div>
    </>
  );
};

export default Signup;
