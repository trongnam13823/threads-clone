import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../createBaseQuery';
import togglePivotInFollowingsCache from './helper/syncUserInFollowingsCache';

const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: createBaseQuery('/users'),
  endpoints: (builder) => ({
    // ------------------------------------------------------------
    // FOLLOW USER
    // ------------------------------------------------------------
    followUser: builder.mutation({
      query: (id) => ({ url: `/${id}/follow`, method: 'POST' }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        togglePivotInFollowingsCache(dispatch, getState, id);

        try {
          await queryFulfilled;
        } catch {
          // rollback
          togglePivotInFollowingsCache(dispatch, getState, id);
        }
      },
    }),

    // ------------------------------------------------------------
    // UNFOLLOW USER
    // ------------------------------------------------------------
    unfollowUser: builder.mutation({
      query: (id) => ({ url: `/${id}/follow`, method: 'DELETE' }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        togglePivotInFollowingsCache(dispatch, getState, id);

        try {
          await queryFulfilled;
        } catch {
          // rollback
          togglePivotInFollowingsCache(dispatch, getState, id);
        }
      },
    }),

    // ------------------------------------------------------------
    // GET FOLLOWERS
    // ------------------------------------------------------------
    getFollowers: builder.query({
      query: ({ id, page }) => ({
        url: `/${id}/followers`,
        method: 'GET',
        params: { page },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.id}`,
      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) return newData;
        currentCache.data.push(...newData.data);
        currentCache.pagination = newData.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg) return false;
        return (
          (currentArg.page === 1 && previousArg.page > 1) || currentArg.page > previousArg.page
        );
      },
    }),

    // ------------------------------------------------------------
    // GET FOLLOWINGS
    // ------------------------------------------------------------
    getFollowings: builder.query({
      query: ({ id, page }) => ({
        url: `/${id}/followings`,
        method: 'GET',
        params: { page },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.id}`,
      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) return newData;
        currentCache.data.push(...newData.data);
        currentCache.pagination = newData.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg) return false;
        return (
          (currentArg.page === 1 && previousArg.page > 1) || currentArg.page > previousArg.page
        );
      },
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
} = usersApi;

export default usersApi;
