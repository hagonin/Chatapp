import React from 'react';
import './Login.scss';
import { imgs } from '@utils/constants';
import Form from '@components/Form/Control/Form';
import TextField from '@components/Form/Control/TextField';
import PasswordField from '@components/Form/Control/PasswordField';
import CheckBoxField from '@components/Form/Control/CheckBoxField';
import Button from '@components/UI/Button';
import PhoneField from '@components/Form/Control/PhoneField';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginWithPhoneForm, setShowLoginWithPhoneForm] =
    React.useState(false);

  return (
    <>
      <div>
        <h1 className="authenLayout__title">
          <span className="authenLayout__title">Talkie</span>-Welcome Back
        </h1>
        <img src={imgs.signin} alt="signin" className="authenLayout__img" />
      </div>
      <div className="authenLayout-form login">
        <button
          className="form__type-login-btn"
          onClick={() => setShowLoginWithPhoneForm(!showLoginWithPhoneForm)}
        >
          {`Sign in with ${showLoginWithPhoneForm ? 'email' : 'mobile phone'}`}
        </button>
        <Form>
          {showLoginWithPhoneForm ? (
            <PhoneField
              name="phone"
              label="Mobile phone"
              placeholder="Enter your mobile phone"
              errorMessage="Please enter your phone"
            />
          ) : (
            <TextField
              name="name"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              errorMessage="Please enter your email"
            />
          )}

          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter your password"
            errorMessage="Please enter your password"
          />

          <div className="login__group">
            <CheckBoxField name="consent" options={{ label: 'Remember me' }} />
            <button className="login__btn-forgot">Forgotten password</button>
          </div>
          <Button type="submit" typeClass="button--primary">
            Login
          </Button>
        </Form>

        <span className="separate separate--signin"></span>
        <Button>
          <img src={imgs.fb} alt="fb" />
          Facebook
        </Button>
        <Button>
          <img src={imgs.google} alt="fb" />
          Google
        </Button>
        <span className="form__already-btn">
          Don't have an account ?
          <button onClick={() => navigate('/register')}>Create account</button>
        </span>
      </div>
    </>
  );
};

export default Login;
