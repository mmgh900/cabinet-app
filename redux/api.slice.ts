// Need to use the React-specific entry point to import createApi
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import configs from "../configs";
import Neighborhood from "../types/Neighborhood";


import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
	baseUrl: `${configs.api_root}/`,
	prepareHeaders: (headers, { getState }) => {
		// By default, if we have a token in the store, let's use that for authenticated requests
		const token = (getState() as RootState).user.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
	credentials: "include", // This allows server to set cookies
});

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQuery,
	tagTypes: ["User", "Neighborhood"],
	endpoints: (builder) => ({
		login: builder.mutation<
			{ token: string },
			{ email: string; password: string }
		>({
			query: (prams) => ({
				url: "Account/login",
				method: "POST",
				body: prams,
			}),
		}),
		register: builder.mutation<
			{ token: string },
			{
				firstName: string;
				lastName: string;
				email: string;
				password: string;
				role: "Admin" | "Driver" | "Commuter";
			}
		>({
			query: (prams) => ({
				url: "Account/signup",
				method: "POST",
				body: prams,
			}),
		}),
		getNeighborhoods: builder.query<Neighborhood[], void>({
			query: () => "Neighborhood",
			providesTags: ["Neighborhood"],
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useGetNeighborhoodsQuery } = api;
