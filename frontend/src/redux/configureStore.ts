import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducers";

const store = configureStore({
    reducer: rootReducers,
    devTools: process.env.NODE_ENV !== 'production',
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    // preloadedState,
    // enhancers: [batchedSubscribe(debounceNotify)],
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateProps = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchProps = typeof store.dispatch
