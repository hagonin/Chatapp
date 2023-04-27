import React from 'react';
import { imgs } from '@utils/constants';
import Button from '@components/Common/Button';
import { useAuthContext } from '@context/authContext';

const SocialBtnGroup: React.FC<{ type: string }> = ({ type }) => {
  const { handleSignInWithGoogle } = useAuthContext();
  return (
    <>
      <span className={`separate separate--${type}`}></span>
      <Button>
        <img src={imgs.fb} alt="fb" />
        Facebook
      </Button>
      <Button onClick={handleSignInWithGoogle}>
        <img src={imgs.google} alt="fb" />
        Google
      </Button>
    </>
  );
};

export default SocialBtnGroup;
