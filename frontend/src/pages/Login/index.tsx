import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import useForm from '@hooks/useForm';
import { imgs } from '@utils/constants';
import Form from '@components/Form/Control/Form';
import TextField from '@components/Form/Control/TextField';
import PasswordField from '@components/Form/Control/PasswordField';
import Button from '@components/Common/Button';
import PhoneField from '@components/Form/Control/PhoneField';
import {
  emailValidate,
  passwordValidate,
  phoneValidate,
} from '@components/Form/Control/validate';
import SocialBtnGroup from '@components/Form/SocialButtonsGroup';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginWithPhoneForm, setShowLoginWithPhoneForm] =
    React.useState(false);
  const { onChange, values, onSubmit, reset, errors, isSubmitting } = useForm({
    initValues: { email: '', password: '', phone: '' },
    onCallApi: data => {
      const res = new Promise(reslove => {
        setTimeout(() => {
          reslove(data);
        }, 2000);
      });
      return res.then(data => console.log(data));
    },
    validate: {
      email: emailValidate,
      password: passwordValidate,
      phone: phoneValidate,
    },
  });

  const handleChangeForm = React.useCallback(() => {
    reset();
    setShowLoginWithPhoneForm(!showLoginWithPhoneForm);
  }, [showLoginWithPhoneForm]);

  return (
    <>
      <div>
        <h1 className="authenLayout__title">
          <Link to="/" className="authenLayout__title-logo">
            Talkie
          </Link>
          -Welcome Back
        </h1>
        <img src={imgs.signin} alt="signin" className="authenLayout__img" />
      </div>
      <div className="authenLayout-form login">
        <button className="form__type-login-btn" onClick={handleChangeForm}>
          {`Sign in with ${showLoginWithPhoneForm ? 'email' : 'mobile phone'}`}
        </button>
        <Form onSubmit={onSubmit}>
          {showLoginWithPhoneForm ? (
            <PhoneField
              name="phone"
              label="Mobile phone"
              placeholder="Enter your mobile phone"
              errorMessage={errors?.phone}
              onChange={onChange}
              values={values}
            />
          ) : (
            <TextField
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              errorMessage={errors?.email}
              onChange={onChange}
              values={values}
            />
          )}
          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter your password"
            errorMessage={errors?.password}
            onChange={onChange}
            values={values}
          />

          <div className="login__group">
            {/* <CheckBoxField
              name="remember"
              option={{ label: 'Remember me' }}
              onChange={onChange}
              values={values}
            /> */}
            <button className="login__btn-forgot" type="button">
              Forgotten password
            </button>
          </div>
          <Button
            type="submit"
            typeClass="button--primary"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </Form>
        <SocialBtnGroup type="signin" />
        <span className="form__already-btn">
          Don't have an account ?
          <button onClick={() => navigate('/register')}>Create account</button>
        </span>
      </div>
    </>
  );
};

export default Login;
