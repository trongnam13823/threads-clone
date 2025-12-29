import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../createBaseQuery';

const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: createBaseQuery('/posts'),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // Get posts feed (for_you, following, ghost)
    getPostsFeed: builder.query({
      query: ({ type = 'for_you', page = 1, per_page = 15 }) => ({
        url: '/feed',
        method: 'GET',
        params: { type, page, per_page },
      }),
      providesTags: (result, error, { type, page }) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Post', id })),
              { type: 'Post', id: `${type}-${page}` },
            ]
          : [{ type: 'Post', id: `${type}-${page}` }],
    }),
  }),
});

export const { useGetPostsFeedQuery, useLazyGetPostsFeedQuery } = postsApi;

export default postsApi;
