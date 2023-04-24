import React, { useCallback, useEffect } from 'react';
import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPhoneNumber,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '@config/firebase';
import { ENDPOINT_REGISTER, imgs } from '@utils/constants';
import { AuthContextType, UserStateType } from './auth_type';
import { FormDataType } from '@hooks/type';

const AuthDefaultState = {
  user: {
    id: 1,
    username: 'David',
    avatar: imgs.user,
    email: 'userA@gmail.com',
    bio: 'Hello i am newer',
    phone: '123456',
    isVerify: false,
  },
  setUser: () => {},
  handleEmailSignUp: () => {},
  requestOTP: () => {},
  verifyOTP: () => {},
};

const AuthContext = React.createContext<AuthContextType>(AuthDefaultState);

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<UserStateType>(AuthDefaultState.user);
  const handleEmailSignUp = React.useCallback(
    async ({ form, data }: FormDataType) => {
      return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(userCredential => {
          const user = userCredential.user;
          console.log('user after create user', user);
          return sendEmailVerification(user);
        })
        .then(() => {
          return fetch(ENDPOINT_REGISTER, {
            method: 'POST',
            body: form,
          });
        })
        .then(res => res.json())
        .then(res => {
          console.log('res after sign ', res);
          toast.success(
            <>
              <p>{res.message}</p>
              <p>Please check email verify in inbox.</p>
              <p>This will be exist in 4 hours.</p>
            </>
          );
          // set User
          // navigative to chatpage
        })
        .catch(error => {
          console.log('error at signup', error);
          console.log('error at signup', error.message);
          toast.error(error.message);
        });
    },
    []
  );

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      // authUser ? > get idToken > check in server > true ? auto login ? no ? autoregister: emailEvefify; info of authUser + endpoint register > auto login
    });
    return () => {
      unlisten();
    };
  }, []);

  const checkVerifyEmail = React.useCallback((verify: boolean) => {
    !verify && toast('Please verify your email');
  }, []);

  const genarateRecaptcha = useCallback(() => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      },
      auth
    );
  }, []);

  const requestOTP = useCallback((opt: string) => {
    genarateRecaptcha();
    const appVerifier = (window as any).recaptchaVerifier;
    console.log(appVerifier);
    signInWithPhoneNumber(auth, opt, appVerifier)
      .then(confirmationResult => {
        (window as any).confirmationResult = confirmationResult;
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, []);

  const verifyOTP = useCallback((otp: string) => {
    const confirmationResult = (window as any).confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result: any) => {
        console.log(result);
        const user = result.user;
        // get token
        // login
        // navigate to chatroom
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleEmailSignUp, requestOTP, verifyOTP }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuthContext = () => React.useContext(AuthContext);

export default AuthProvider;
export { useAuthContext };
