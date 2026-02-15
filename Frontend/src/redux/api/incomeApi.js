
import {apiSlice} from "./apiSlice";

 export const incomeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ADD INCOME
        addIncome: builder.mutation({
            query: (data) => ({
                url: '/income',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Income"]
        }),
        // GET ALL INCOME
        getIncome: builder.query({
            query: () => '/income',
            providesTags: ["Income"]
        }),
      // DELETE INCOME
      deleteIncome: builder.mutation({
        query: (id) => ({
            url: `/income/${id}`,
            method: 'DELETE'
        }),
        invalidatesTags: ["Income"]
      })
    })
})

export const { useAddIncomeMutation, useGetIncomeQuery, useDeleteIncomeMutation } = incomeApi;