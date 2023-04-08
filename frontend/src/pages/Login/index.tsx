import React from 'react';
import './Login.scss';
import { imgs } from '@utils/constants';
import Form from '@components/Form/Control/Form';
import TextField from '@components/Form/Control/TextField';
import PasswordField from '@components/Form/Control/PasswordField';
import CheckBoxField from '@components/Form/Control/CheckBoxField';
import Button from '@components/UI/Button';

const Login: React.FC = () => {
  const [showFormLogin, setShowFormLogin] = React.useState(false);
  return (
    <div className="login">
      <h1 className="login__title">Welcome back, Login with</h1>
      {showFormLogin ? (
        <>
          <button onClick={() => setShowFormLogin(false)}>Back</button>
          <Form>
            <TextField
              name="name"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              // errorMessage="Please enter your phone"
            />

            <PasswordField
              name="password"
              label="Password"
              placeholder="Enter your password"
              // errorMessage="Please enter your password"
            />

            <div className='login__group'>
              <CheckBoxField
                name="consent"
                options={{ label: 'Remember me' }}
              />
              <button className="login__btn-forgot">Forgotten password</button>
            </div>
            <Button type="submit">Login</Button>
          </Form>
        </>
      ) : (
        <>
          <Button onClick={() => setShowFormLogin(true)}>
            Using Email / Mobile Phone
          </Button>
          <Button>
            <img src={imgs.fb} alt="fb" />
            Facebook
          </Button>
          <Button>
            <img src={imgs.google} alt="fb" />
            Google
          </Button>
        </>
      )}
    </div>
  );
};

export default Login;
