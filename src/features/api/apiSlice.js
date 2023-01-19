import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// creating rtk query api slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000'
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => '/videos'
    })
  })
});

export const { useGetVideosQuery } = apiSlice;
