import { createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "lodash";
import { authService } from "@services";
import { setUserInfo } from "./slice";
import { auth } from "@config/firebase";

interface DataProps {
    [key: string]: string;
}

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (data: DataProps, { rejectWithValue, dispatch }) => {
        try {

            const { user } = await authService.register(data);
            const { email, displayName, phoneNumber } = user;
            await authService.sendEmailVerification();
            dispatch(setUserInfo({
                email: email,
                username: displayName,
                phone_number: phoneNumber
            }));
            return rejectWithValue("unauthorized")
        }
        catch (error) {
            return rejectWithValue(error);
        }
    })

export const resendConfirmationCodeThunk = createAsyncThunk(
    'auth/resendConfirmationCode',
    async (data: DataProps, { rejectWithValue }) => {
        try {
        }
        catch (error) {
            return rejectWithValue(error);
        }
    })

export const confirmSignUpThunk = createAsyncThunk(
    'auth/confirmSignUp',
    async (data: DataProps, { rejectWithValue }) => {
        try {
        }
        catch (error) {
            return rejectWithValue(error);
        }
    })

export const loginWithEmailThunk = createAsyncThunk(
    'auth/login',
    async (data: DataProps, { rejectWithValue, dispatch }) => {
        try {
            const res = await authService.login(data);
            console.log(`res after login`, res);
            // get token here
            // const token = get(res, "token.access");
            // const userInfo = get(res, "data");
            // if (!!token) {
            //     // set cookie here
            //     dispatch(setUserInfo(userInfo));
            //     return null;
            // }
            // return rejectWithValue("unauthorized");
        }
        catch (error) {
            return rejectWithValue(error);
        }
    })

export const loginWithPhoneThunk = createAsyncThunk(
    'auth/login',
    async (data: DataProps, { rejectWithValue, dispatch }) => {
        try {
            const res = await authService.login(data);
            console.log(res);
            // get token here
            // const token = get(res, "token.access");
            // const userInfo = get(res, "data");
            // if (!!token) {
            //     // set cookie here
            //     dispatch(setUserInfo(userInfo));
            //     return null;
            // }
            // return rejectWithValue("unauthorized");
        }
        catch (error) {
            return rejectWithValue(error);
        }
    })

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout()
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const loginWidthGoogleThunk = createAsyncThunk(
    'auth/loginWithGoogle',
    async (_, { rejectWithValue }) => {
        try {
            const result = await authService.signInWidthGoogle();
            const credential = authService.getRedirectResul(result);
            const token = credential?.accessToken;
            const user = result.user;
            console.log({ token: token, user: user });

        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const requestOtpThunk = createAsyncThunk(
    'auth/requestOtp',
    async (data: DataProps, { rejectWithValue }) => {
        try {
            authService.recaptchaVerifier({
                'callback': () => {
                    console.log('reCapcha is solved');
                    authService.requestOTP(data).then(confirmationResult => {
                        (window as any).confirmationResult = confirmationResult;
                        console.log('the request opt is sent');
                    })
                },
            })
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const comfirmOtpThunk = createAsyncThunk(
    'auth/comfirmOtp',
    async (data: DataProps, { rejectWithValue }) => {
        try {
            const result = await authService.confirmOTP(data);
            console.log(`comfirm Otp Thunk`, result)
        }
        catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getMeThunk = createAsyncThunk('auth/getme', async (_, { rejectWithValue, dispatch }) => {
    try {
        const currentUser = auth.currentUser;
        console.log(currentUser)
        // get token here
        // const userInfo = get(profile, "data");
        // dispatch(setUserInfo(userInfo));
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const sendPasswordResetEmailThunk = createAsyncThunk('auth/sendPasswordReset', async (data: DataProps, { rejectWithValue, dispatch }) => {
    try {
        await authService.sendPasswordResetEmail(data);
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const updateProfileThunk = createAsyncThunk('auth/sendPasswordReset', async (profile: DataProps, { rejectWithValue, dispatch }) => {
    try {
        const res = await authService.updateProfile(profile);
        console.log(res);
    }
    catch (error) {
        return rejectWithValue(error);
    }
})


// export const 