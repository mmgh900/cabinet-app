import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

import jwt from "jwt-decode"; // import dependency
import User from "../types/User";

// Define a type for the slice state
interface UserState {
	currentUser: Partial<User> | null;
	token: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
	currentUser: null,
	token: null,
};

export const userSlice = createSlice({
	name: "user",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		setCurrentUser: (state, action: PayloadAction<string>) => {
			const jwtTokenData = jwt(action.payload) as any;
			state.token = action.payload;
			state.currentUser = {
				email:
					jwtTokenData[
						"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
					],
				role: jwtTokenData[
					"http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
				],
			} as User;
		},
		logout: (state) => {
			state.currentUser = null;
			state.token = null;
		},
	},
});

export const { setCurrentUser, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;
