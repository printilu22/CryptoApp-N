import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Helper function to create requests with the News API headers
const createRequest = (url) => ({ url });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cryptoapp-n-backend.onrender.com/api' }), // Live backend URL
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/everything?q=${newsCategory}&pageSize=${count}`),
    }),
  }),
});

// Exporting the hook for fetching news
export const { useGetCryptoNewsQuery } = cryptoNewsApi;
