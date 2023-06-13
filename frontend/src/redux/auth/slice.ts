import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserInfoProps {
    name: string;
    age: number
}

interface initialStateProps {
    userInfo: UserInfoProps
}

const initialState: initialStateProps = {
    userInfo: {
        name: 'John Master',
        age: 20
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