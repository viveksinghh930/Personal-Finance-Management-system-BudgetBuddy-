import { apiSlice } from "./apiSlice";

export const expenseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addExpance: builder.mutation({
            query: (data) => ({
                url: '/expense',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Expense"]
        }),
        getExpance: builder.query({
            query: () => '/expense',
            providesTags: ["Expense"]
        })
    })
})

export const { useAddExpanceMutation, useGetExpanceQuery } = expenseApi;
