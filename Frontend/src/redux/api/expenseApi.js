import { apiSlice } from "./apiSlice";

export const expenseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addExpense: builder.mutation({
            query: (data) => ({
                url: '/expense',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Expense"]
        }),
        getExpense: builder.query({
            query: () => '/expense',
            providesTags: ["Expense"]
        }),
        updateExpense: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/expense/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ["Expense"]
        }),
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `/expense/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Expense"]
        }),
        getTotalExpense: builder.query({
            query: () => '/expense/total',
            providesTags: ["Expense"]
        })
    })
})

export const { 
    useAddExpenseMutation, 
    useGetExpenseQuery,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
    useGetTotalExpenseQuery 
} = expenseApi;
