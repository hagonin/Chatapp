import React from 'react';
import { Link } from 'react-router-dom';
import { imgs } from '@utils/constants';
import ChangePasswordForm from '@components/Form/ChangePasswordForm';

const ResetChangePassword: React.FC = () => {
  const handleSubmit = (data: {}) => {
    const res = new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 3000);
    });
    return res.then(res => {
      console.log(res);
    });
  };
  return (
    <>
      <div className="authenLayout-form login">
        <ChangePasswordForm handleSubmit={handleSubmit} />
      </div>
      <div>
        <h1 className="authenLayout__title">
          <Link to="/" className="authenLayout__title-logo">
            Talkie
          </Link>
          -Reset Password
        </h1>
        <span className="authenLayout__subtitle">
          No worries, we will send you a link reset new password.
        </span>
        <img
          src={imgs.resetPassword}
          alt="signin"
          className="authenLayout__img"
        />
      </div>
    </>
  );
};

export default ResetChangePassword;
