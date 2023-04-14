import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss';
import { imgs } from '@utils/constants';
import useForm from '@hooks/useForm';
import SocialBtnGroup from '@components/Form/SocialButtonsGroup';
import Button from '@components/Common/Button';
import {
  emailValidate,
  passwordValidate,
  phoneValidate,
  usernameValidate,
} from '@components/Form/Control/validate';
import {
  Form,
  PasswordError,
  PasswordField,
  PhoneField,
  TextField,
} from '@components/Form/Control';

const Signup: React.FC = () => {
  const [showSignUpByPhoneForm, setShowSignUpByPhoneForm] =
    React.useState(false);
  const navigate = useNavigate();
  const { onSubmit, values, onChange, reset, errors, isSubmitting } = useForm({
    initValues: { email: '', phone: '', password: '' },
    onCallApi: data => {
      const res = new Promise(reslove => {
        setTimeout(() => {
          reslove(data);
        }, 3000);
      });
      return res.then(data => console.log(data));
    },
    validate: {
      username: usernameValidate,
      email: emailValidate,
      phone: phoneValidate,
      password: [
        ...passwordValidate,
        {
          rule: 'password',
          message: <PasswordError />,
        },
      ],
    },
  });

  const handleChangeForm = React.useCallback(() => {
    reset();
    setShowSignUpByPhoneForm(!showSignUpByPhoneForm);
  }, [showSignUpByPhoneForm]);

  return (
    <>
      <div className="authenLayout-form signup">
        <button className="form__type-login-btn" onClick={handleChangeForm}>
          {`Sign up with ${showSignUpByPhoneForm ? 'email' : 'mobile phone'}`}
        </button>
        <Form onSubmit={onSubmit}>
          {showSignUpByPhoneForm ? (
            <PhoneField
              name="phone"
              label="Mobile Phone"
              placeholder="Enter your mobile phone"
              errorMessage={errors.phone}
              values={values}
              onChange={onChange}
            />
          ) : (
            <TextField
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              errorMessage={errors.email}
              values={values}
              onChange={onChange}
            />
          )}

          <PasswordField
            name="password"
            label="Password"
            placeholder="Enter your password"
            errorMessage={errors.password}
            values={values}
            onChange={onChange}
          />
          {/* <PasswordField
            name="confirm-password"
            label="Confirm Password"
            placeholder="Re-enter password"
            // errorMessage="Please enter your confirm password"
            values={values}
          /> */}
          <Button
            type="submit"
            typeClass="button--primary"
            disabled={isSubmitting}
          >
            Register
          </Button>
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
        </Form>
      </div>
      <div>
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
