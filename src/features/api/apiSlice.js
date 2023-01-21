import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// creating rtk query api slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000'
  }),
  tagTypes: ['Videos'],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => '/videos',
      keepUnusedDataFor: 600,
      providesTags: ['Videos']
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`
    }),
    // ?title_like=react&title_like=tutorial&_limit
    getRelatedVidoes: builder.query({
      query: ({ id, title }) => {
        // split title
        const tags = title.split(' '); // return array
        // generate Query string
        const likes = tags.map((tag) => `title_like=${tag}`);
        const queryString = `/videos?${likes.join('&')}&_limit=4`;
        return queryString;
      }
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: '/videos',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Videos']
    })
  })
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVidoesQuery,
  useAddVideoMutation
} = apiSlice;
