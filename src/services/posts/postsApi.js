import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../createBaseQuery';
import syncPostInFeedCache from './helper/syncPostInFeedCache';

const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: createBaseQuery('/posts'),
  endpoints: (builder) => ({
    // ------------------------------------------------------------
    // GET POSTS FEED
    // ------------------------------------------------------------
    getPostsFeed: builder.query({
      query: ({ type, page }) => ({
        url: '/feed',
        params: { type, page },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.type}`,
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
    // LIKE POST
    // ------------------------------------------------------------
    likePost: builder.mutation({
      query: (id) => ({ url: `/${id}/like`, method: 'POST' }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        // Optimistic update: toggle ngay UI
        syncPostInFeedCache(dispatch, getState, id, (post) => {
          post.is_liked_by_auth = !post.is_liked_by_auth;
          post.likes_count += post.is_liked_by_auth ? 1 : -1;
        });

        try {
          const { data } = await queryFulfilled;

          // Đồng bộ chính xác theo response server
          syncPostInFeedCache(dispatch, getState, id, (post) => {
            post.is_liked_by_auth = data.data.is_liked;
            post.likes_count = data.data.likes_count;
          });
        } catch {
          // Rollback nếu lỗi
          syncPostInFeedCache(dispatch, getState, id, (post) => {
            post.is_liked_by_auth = !post.is_liked_by_auth;
            post.likes_count += post.is_liked_by_auth ? 1 : -1;
          });
        }
      },
    }),
  }),
});

export const { useGetPostsFeedQuery, useLazyGetPostsFeedQuery, useLikePostMutation } = postsApi;

export default postsApi;
