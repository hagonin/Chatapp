import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@services";
import { get } from "lodash";
import { setUserInfo } from "./slice";


export const registerThunk = createAsyncThunk('auth/register', async (data: {}, { rejectWithValue, dispatch }) => {
    try {
        const res = await authService.register(data);
        // get token here
        const token = get(res, "token.access");
        const userInfo = get(res, "data");
        if (!!token) {
            // set cookie here
            dispatch(setUserInfo(userInfo));
            return null;
        }
        return rejectWithValue("unauthorized")
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const loginThunk = createAsyncThunk('auth/login', async (data: {}, { rejectWithValue, dispatch }) => {
    try {
        const res = await authService.login(data);
        // get token here
        const token = get(res, "token.access");
        const userInfo = get(res, "data");
        if (!!token) {
            // set cookie here
            dispatch(setUserInfo(userInfo));
            return null;
        }
        return rejectWithValue("unauthorized")
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

export const getMeThunk = createAsyncThunk('auth/getme', async (_, { rejectWithValue, dispatch }) => {
    try {
        const res = await authService.getMe();
        // get token here
        const userInfo = get(res, "data");
        dispatch(setUserInfo(userInfo));
    }
    catch (error) {
        return rejectWithValue(error);
    }
})