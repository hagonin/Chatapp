import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { imgs } from '@utils/constants';
import RequestPasswordForm from '@container/RequestPasswordForm';

const ResetPassword: React.FC = () => {
  return (
    <>
      <div className="authenLayout-form login">
        <h1 className="authenLayout__title">
          <Link to="/" className="authenLayout__title-logo">
            Talkie
          </Link>
          -Reset Password
        </h1>
        {/* form */}
        <RequestPasswordForm />
      </div>

      <div className="authenLayout__header">
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

export default ResetPassword;
