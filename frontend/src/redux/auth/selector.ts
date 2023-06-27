import { createSelector } from "@reduxjs/toolkit";

const selectAuthState = (state: any) => state.auth;
const selectUserInfo = createSelector(selectAuthState, (state) => state.userInfo);
export default selectUserInfo;