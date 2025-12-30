import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../createBaseQuery';

const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: createBaseQuery('/posts'),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPostsFeed: builder.query({
      query: ({ type = 'for_you', page = 1, per_page = 15 }) => ({
        url: '/feed',
        params: { type, page, per_page },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.type}`,
      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) return newData;
        currentCache.data.push(...newData.data);
        currentCache.pagination = newData.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg) return false;
        return currentArg.page !== previousArg.page;
      },
      providesTags: (result, error, { type }) =>
        result?.data
          ? [
              ...result.data.map((post) => ({
                type: 'Post',
                id: post.id,
              })),
              { type: 'Post', id: type },
            ]
          : [{ type: 'Post', id: type }],
    }),
  }),
});

export const { useGetPostsFeedQuery, useLazyGetPostsFeedQuery } = postsApi;

export default postsApi;
