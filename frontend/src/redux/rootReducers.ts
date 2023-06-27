import { combineReducers } from '@reduxjs/toolkit'
import appSlice from './app/slice';
import authSlice from './auth/slice';

const rootReducers = combineReducers({
    [appSlice.name]: appSlice.reducer,
    [authSlice.name]: authSlice.reducer
});

export default rootReducers;