import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserInfoProps {
    username: string | null;
    email: string | null;
    phone_number: string | null;
    bio: ''
}

interface initialStateProps {
    userInfo: UserInfoProps
}

const initialState: initialStateProps = {
    userInfo: {
        username: '',
        email: '',
        phone_number: '',
        bio: ''
    },
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<Partial<UserInfoProps>>) => {
            state.userInfo = { ...state.userInfo, ...action.payload };
        }
    },
    extraReducers: (builder) => {

    }
});

export const { setUserInfo } = authSlice.actions
export default authSlice;