import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import { imgs } from '@utils/constants';
import SocialBtnGroup from '@components/Form/SocialButtonsGroup';
import { SignInWithEmailForm } from '@container/Signin';
import { SignUpWithPhoneForm } from '@container/Signup';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginWithPhoneForm, setShowLoginWithPhoneForm] =
    React.useState(false);
  return (
    <>
      <div className="authenLayout__header">
        <h1 className="authenLayout__title">
          <Link to="/" className="authenLayout__title-logo">
            Talkie
          </Link>
          -Welcome Back
        </h1>
        <img src={imgs.signin} alt="signin" className="authenLayout__img" />
      </div>
      <div className="authenLayout-form login">
        <h1 className="authenLayout__title">
          <Link to="/" className="authenLayout__title-logo">
            Talkie
          </Link>
          -Welcome Back
        </h1>
        <button
          className="form__type-login-btn"
          onClick={() => setShowLoginWithPhoneForm(!showLoginWithPhoneForm)}
        >
          {`Sign in with ${showLoginWithPhoneForm ? 'email' : 'mobile phone'}`}
        </button>
        {showLoginWithPhoneForm ? (
          <SignUpWithPhoneForm title="Login" />
        ) : (
          <SignInWithEmailForm />
        )}

        <div className="login__group">
          <button
            className="login__btn-forgot"
            type="button"
            onClick={() => navigate('/login/request_reset_password')}
          >
            Forgotten password
          </button>
        </div>
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
