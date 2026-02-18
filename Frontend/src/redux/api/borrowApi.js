import { apiSlice } from "./apiSlice";

export const borrowApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBorrow: builder.query({
            query: () => '/borrow',
            providesTags: ['Borrow']
        }),
        getTotalBorrow: builder.query({
            query: () => '/borrow/total',
            providesTags: ['Borrow']
        }),
        addBorrow: builder.mutation({
            query: (data) => ({
                url: '/borrow',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Borrow']
        }),
        updateBorrow: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/borrow/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Borrow']
        }),
        deleteBorrow: builder.mutation({
            query: (id) => ({
                url: `/borrow/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Borrow']
        })
    })
});

export const { 
    useGetBorrowQuery, 
    useGetTotalBorrowQuery, 
    useAddBorrowMutation,
    useUpdateBorrowMutation,
    useDeleteBorrowMutation 
} = borrowApi;