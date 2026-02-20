import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || "https://budgetbuddy-backend-emg8.onrender.com/api",
        credentials:"include"
    }),
    tagTypes:["Income", "Expense", "Payment", "Borrow", "Debt"],     
    endpoints: () => ({})
})
