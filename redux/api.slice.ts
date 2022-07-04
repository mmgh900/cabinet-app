// Need to use the React-specific entry point to import createApi
import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {createApi} from "@reduxjs/toolkit/query/react";
import configs from "../configs";
import Neighborhood from "../types/Neighborhood";

import {RootState} from "./store";
import {logout, setCurrentUser} from "./user.reducer";
import Commute, {CommuteRequest} from "../types/Commute";

const baseQuery = fetchBaseQuery({
    baseUrl: `${configs.api_root}/`,
    prepareHeaders: (headers, {getState}) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).user.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
    credentials: "include", // This allows server to set cookies
});
const baseQueryWithAutoLogout: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
        console.log("User deleted when refresh token returned some error");
    }
    return result;
};
export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithAutoLogout,
    tagTypes: ["User", "Neighborhood", 'Commute'],
    endpoints: (builder) => ({
        login: builder.mutation<{ token: string },
            { email: string; password: string }>({
            query: (prams) => ({
                url: "Account/login",
                method: "POST",
                body: prams,
            }),
        }),
        register: builder.mutation<{ token: string },
            {
                firstName: string;
                lastName: string;
                email: string;
                password: string;
                role: "Admin" | "Driver" | "Commuter";
            }>({
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
        requestCommute: builder.mutation<void, CommuteRequest>({
            query: (prams) => ({
                url: "Commutes",
                method: "POST",
                body: prams,
            }),
            invalidatesTags: ['Commute']
        }),
        getPendingRequests: builder.query<Commute[], void>({
            query: arg => 'Commutes/pendings',
            providesTags: ["Commute"]
        }),
        getCurrentCommute: builder.query<Commute, void>({
            query: arg => 'Commutes/current',
            providesTags: ["Commute"]
        }),
        changePrice: builder.mutation<void, { id: number, price: number }>({
            query: (prams) => ({
                url: `Commutes/${prams.id}/change-price`,
                method: "PATCH",
                body: {
                    price: prams.price,
                },

            }),
            invalidatesTags: ['Commute']
        }),
        acceptCommute: builder.mutation<void, { id: number }>({
            query: (prams) => ({
                url: `Commutes/${prams.id}/accept`,
                method: "PATCH",

            }),
            invalidatesTags: ['Commute']
        }),
        cancelCommute: builder.mutation<void, { id: number }>({
            query: (prams) => ({
                url: `Commutes/${prams.id}/cancel`,
                method: "PATCH",


            }),
            invalidatesTags: ['Commute']
        }),
        endCommute: builder.mutation<void, { id: number }>({
            query: (prams) => ({
                url: `Commutes/${prams.id}/end`,
                method: "PATCH",

            }),
            invalidatesTags: ['Commute']
        }),
        rateCommute: builder.mutation<void, { id: number, score: number }>({
            query: (prams) => ({
                url: `Commutes/${prams.id}/rate`,
                method: "PATCH",
                body: {
                    score: prams.score,
                },

            }),
            invalidatesTags: ['Commute']
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetNeighborhoodsQuery,
    useRequestCommuteMutation,
    useGetPendingRequestsQuery,
    useGetCurrentCommuteQuery,
    useChangePriceMutation,
    useAcceptCommuteMutation,
    useCancelCommuteMutation,
    useEndCommuteMutation,
    useRateCommuteMutation,
} = api;
