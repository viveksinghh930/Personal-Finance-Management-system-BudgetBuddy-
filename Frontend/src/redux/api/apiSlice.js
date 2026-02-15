import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


 export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8080/api",
        credentials:"include"
    }),
    tagTypes:["Income", "Expense"],     
    endpoints: () => ({})
 

    //------ set endpoints (niche example diya hai)-----
//      endpoints: (builder) => ({
//   getIncome: builder.query({ 
//     query: () => '/income'
//   }),

//   addIncome: builder.mutation({
//     query: (data) => ({
//       url: '/income',
//       method: 'POST',
//       body: data
//     })
//   })
// })

})
