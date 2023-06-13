import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss';
import { imgs } from '@utils/constants';
import SocialBtnGroup from '@components/Form/SocialButtonsGroup';
import selectUserInfo from '@redux/auth/selector';
import { useAppDispatch, useAppSelector } from '@redux/hook';
import { setUserInfo } from '@redux/auth/slice';
import { SignUpWithEmailForm, SignUpWithPhoneForm } from '@container/Signup';

const Signup: React.FC = () => {
  const [showSignUpByPhoneForm, setShowSignUpByPhoneForm] =
    React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="authenLayout-form signup">
        <h1 className="authenLayout__title">
          <Link to="/" className="authenLayout__title-logo">
            Talkie
          </Link>
          -Create account
        </h1>
        <button
          className="form__type-login-btn"
          onClick={() => setShowSignUpByPhoneForm(!showSignUpByPhoneForm)}
        >
          {`Sign up with ${showSignUpByPhoneForm ? 'email' : 'mobile phone'}`}
        </button>
        <>
          {showSignUpByPhoneForm ? (
            <SignUpWithPhoneForm type="signup" />
          ) : (
            <SignUpWithEmailForm />
          )}

          <SocialBtnGroup type="signup" />
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
        </>
      </div>
      <div className="authenLayout__header">
        <h1 className="authenLayout__title">
          <Link to="/" className="authenLayout__title-logo">
            Talkie
          </Link>
          -Create account
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
