import React from 'react';
import { Link } from 'react-router-dom';
import { imgs } from '@utils/constants';
import ChangePasswordForm from '@container/ChangePasswordForm';

const ChangePassword: React.FC = () => {
  return (
    <>
      <div>
        <h1 className="authenLayout__title">
          <Link to="/" className="authenLayout__title-logo">
            Talkie
          </Link>
          -Change Password
        </h1>
        <span className="authenLayout__subtitle">
          No worries, we will send you a link reset new password.
        </span>
        <img
          src={imgs.changePassword}
          alt="signin"
          className="authenLayout__img"
        />
      </div>
      <div className="authenLayout-form login">
        <ChangePasswordForm />
      </div>
    </>
  );
};

export default ChangePassword;
