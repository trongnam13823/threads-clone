import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../createBaseQuery';

const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: createBaseQuery('/api/users'),
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: (id) => ({
        url: `/${id}/follow`,
        method: 'POST',
      }),
    }),

    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `/${id}/follow`,
        method: 'DELETE',
      }),
    }),

    getFollowers: builder.query({
      query: (id) => ({
        url: `/${id}/followers`,
        method: 'GET',
      }),
    }),

    getFollowings: builder.query({
      query: (id) => ({
        url: `/${id}/followings`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetFollowersQuery,
  useLazyGetFollowersQuery,
  useGetFollowingsQuery,
  useLazyGetFollowingsQuery,
} = followApi;

export default followApi;
