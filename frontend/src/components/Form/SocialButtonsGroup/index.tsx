import React from 'react';
import { imgs } from '@utils/constants';
import Button from '@components/Common/Button';
import { useAppDispatch } from '@redux/hook';
import { loginWidthGoogleThunk } from '@redux/auth/thunk';

const SocialBtnGroup: React.FC<{ type: string }> = ({ type }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <span className={`separate separate--${type}`}></span>
      {/* <Button>
        <img src={imgs.fb} alt="fb" />
        Facebook
      </Button> */}
      <Button onClick={() => dispatch(loginWidthGoogleThunk())}>
        <img src={imgs.google} alt="fb" />
        Google
      </Button>
    </>
  );
};

export default SocialBtnGroup;
