
import {apiSlice} from "./apiSlice";

 export const incomeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addIncome: builder.mutation({
            query: (data) => ({
                url: '/income',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Income"]
        }),
        getIncome: builder.query({
            query: () => '/income',
            providesTags: ["Income"]
        }),
        updateIncome: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/income/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ["Income"]
        }),
        deleteIncome: builder.mutation({
            query: (id) => ({
                url: `/income/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Income"]
        }),
        getTotalIncome: builder.query({
            query: () => '/income/total',
            providesTags: ["Income"]
        })
    })
})

export const { 
    useAddIncomeMutation, 
    useGetIncomeQuery, 
    useUpdateIncomeMutation,
    useDeleteIncomeMutation,
    useGetTotalIncomeQuery 
} = incomeApi;