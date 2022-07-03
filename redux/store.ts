import {
	combineReducers,
	configureStore, Middleware,
	MiddlewareAPI
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { api } from "./api.slice";
import userReducer from "./user.reducer";
// ...
const reducers = combineReducers({
	user: userReducer,
	[api.reducerPath]: api.reducer,
});

const persistConfig = {
	key: "root",
	storage,
	blacklist: [api.reducerPath],
};
export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => (next) => (action) => {
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
		if (
			action?.payload?.status === "FETCH_ERROR" &&
			window &&
			window.location.pathname !== "/server-problem"
		) {
			// console.log(window?.location?.pathname)
			console.warn("We got a rejected action!", action);
			// window.history.state({}, '', '/server-problem')
			window.location.href = "/server-problem";
		}

		return next(action);
	};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
	reducer: persistedReducer,
	middleware: [/*logger,*/ thunk, api.middleware],
});

export default store;

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
