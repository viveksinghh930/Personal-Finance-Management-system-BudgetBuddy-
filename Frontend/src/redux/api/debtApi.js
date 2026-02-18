import { apiSlice } from "./apiSlice";

export const debtApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDebts: builder.query({
            query: () => '/debt',
            providesTags: ['Debt']
        }),
        getDebtStats: builder.query({
            query: () => '/debt/stats',
            providesTags: ['Debt']
        }),
        addDebt: builder.mutation({
            query: (data) => ({
                url: '/debt',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Debt']
        }),
        updateDebt: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/debt/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Debt']
        }),
        deleteDebt: builder.mutation({
            query: (id) => ({
                url: `/debt/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Debt']
        })
    })
});

export const { 
    useGetDebtsQuery, 
    useGetDebtStatsQuery, 
    useAddDebtMutation,
    useUpdateDebtMutation,
    useDeleteDebtMutation 
} = debtApi;