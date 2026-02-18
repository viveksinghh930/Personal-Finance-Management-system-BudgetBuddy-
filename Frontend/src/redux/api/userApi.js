import {apiSlice} from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/user/login',
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/user/register',
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'GET'
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/user/updateProfile',
                method: 'POST',
                body: data
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: '/user/changePassword',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useUpdateProfileMutation, useChangePasswordMutation } = userApi;
