import React from 'react';
import { Link } from 'react-router-dom';
import { imgs } from '@utils/constants';
import ChangePasswordForm from '@components/Form/ChangePasswordForm';

const ChangePassword: React.FC = () => {
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
        <ChangePasswordForm handleSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default ChangePassword;
