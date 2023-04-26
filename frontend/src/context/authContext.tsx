import React, { useCallback, useEffect } from 'react';
import {
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  getIdToken,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '@config/firebase';
import { ENDPOINT_LOGIN, ENDPOINT_REGISTER, imgs } from '@utils/constants';
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
  handleLoginWithEmail: () => {},
};

const AuthContext = React.createContext<AuthContextType>(AuthDefaultState);

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<UserStateType>(AuthDefaultState.user);

  // SIGN UP******************************************
  const handleEmailSignUp = React.useCallback(
    async ({ form, data }: FormDataType) => {
      return createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(userCredential => {
          const user = userCredential.user;
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
          console.log('Created account successfully:', res);
          toast.success(
            <>
              <p>Created account successfully</p>
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

  // LOGIN***********************
  const handleLoginWithEmail = useCallback(
    async ({ form, data }: FormDataType) => {
      await signInWithEmailAndPassword(auth, data.email, data.password)
        .then(userCredential => {
          console.log(userCredential.user);
          return userCredential.user.getIdToken();
        })
        .then(idToken => {
          return fetch(ENDPOINT_LOGIN, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
            body: form,
          });
        })
        .then(res => res.json())
        .then(res => {
          console.log('login success', res);
          // setuser
          //navigate to
        })
        .catch(error => console.log('login has error', error));
    },
    []
  );

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
        // endpoint register
        // auto login
        // navigate to chatroom
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(authUser => {
      // login
      // if (auth) {
      //   console.log(auth.currentUser);
      //   // signInWithEmailAndPassword('user@example.com', 'password').then;
      // }
      // authUser ? > get idToken > check in server > true ? auto login ? no ? autoregister: emailEvefify; info of authUser + endpoint register > auto login
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleEmailSignUp,
        requestOTP,
        verifyOTP,
        handleLoginWithEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuthContext = () => React.useContext(AuthContext);

export default AuthProvider;
export { useAuthContext };
