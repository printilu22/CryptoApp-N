import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Ensure these variables are set in your .env file
const cryptoApiHeaders = {
  'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST, // Make sure this is correctly set in your .env
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY, // Ensure this is correctly set in your .env
};

// Base URL configuration for CoinRanking API
const baseUrl = process.env.REACT_APP_BASE_URL || 'https://coinranking1.p.rapidapi.com'; // Base URL from the environment

// Function to create request configuration
const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi', // Unique key for the API reducer in Redux store
  baseQuery: fetchBaseQuery({ baseUrl }), // Base URL for all API requests
  endpoints: (builder) => ({
    // Fetch list of cryptocurrencies
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`), // API endpoint with dynamic query parameter
    }),

    // Fetch details of a specific cryptocurrency
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`), // API endpoint for coin details
    }),

    // Fetch historical data for a specific cryptocurrency
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?timeperiod=${timeperiod}`), // API endpoint with multiple query parameters
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
