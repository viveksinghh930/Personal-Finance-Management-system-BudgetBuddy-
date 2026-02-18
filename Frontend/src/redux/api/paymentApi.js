import { apiSlice } from "./apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addPayment: builder.mutation({
            query: (data) => ({
                url: '/payment',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Payment']
        }),
        getPayments: builder.query({
            query: () => '/payment',
            providesTags: ['Payment']
        }),
        deletePayment: builder.mutation({
            query: (id) => ({
                url: `/payment/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Payment']
        }),
        updatePayment: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/payment/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Payment']
        })
    })
});

export const { useAddPaymentMutation, useGetPaymentsQuery, useDeletePaymentMutation, useUpdatePaymentMutation } = paymentApi;
