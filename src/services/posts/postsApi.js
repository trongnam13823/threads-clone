import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../createBaseQuery';
import syncPostInFeedCache from './helper/syncPostInFeedCache';
import removePostFromFeedCache from './helper/removePostFromFeedCache';
import syncPostInRepliesCache from './helper/syncPostInRepliesCache';
import removePostFromRepliesCache from './helper/removePostFromRepliesCache';

const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: createBaseQuery('/posts'),
  endpoints: (builder) => ({
    // ------------------------------------------------------------
    // CREATE NEW POST
    // ------------------------------------------------------------
    createPost: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append('_method', 'POST');

        if (data.content) formData.append('content', data.content);

        if (data.replyPermission) formData.append('reply_permission', data.replyPermission);
        if (data.topicName) formData.append('topic_name', data.topicName);

        if (data.media && data.media.length) {
          data.media.forEach((file) => formData.append('media[]', file));
        }

        return {
          method: 'POST',
          body: formData,
        };
      },
    }),
    // ------------------------------------------------------------
    // EDIT POST
    // ------------------------------------------------------------
    editPost: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append('_method', 'PUT');

        if (data.content) formData.append('content', data.content);

        if (data.replyPermission) formData.append('reply_permission', data.replyPermission);
        if (data.topicName) formData.append('topic_name', data.topicName);

        if (data.media && data.media.length) {
          data.media.forEach((file) => formData.append('media[]', file));
        }

        return {
          url: `/${data.id}`,
          method: 'POST',
          body: formData,
        };
      },
      async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
        // optimistic update: cập nhật ngay khỏi cache
        let originalContent = '';

        // Lưu originalContent từ feed cache hoặc replies cache
        const state = getState();
        const queries = state.postsApi.queries;
        Object.keys(queries).forEach((key) => {
          if (key.startsWith('getPostsFeed') || key.startsWith('getPostReplies')) {
            const queryCache = queries[key];
            if (queryCache?.status === 'fulfilled' && queryCache.data?.data) {
              const post = queryCache.data.data.find((p) => p.id === data.id);
              if (post && !originalContent) {
                originalContent = post.content;
              }
            }
          }
        });

        syncPostInFeedCache(dispatch, getState, data.id, (post) => {
          post.content = data.content;
        });
        syncPostInRepliesCache(dispatch, getState, data.id, (post) => {
          post.content = data.content;
        });

        try {
          await queryFulfilled;
        } catch {
          syncPostInFeedCache(dispatch, getState, data.id, (post) => {
            post.content = originalContent;
          });
          syncPostInRepliesCache(dispatch, getState, data.id, (post) => {
            post.content = originalContent;
          });
        }
      },
    }),
    // ------------------------------------------------------------
    // DELETE POST
    // ------------------------------------------------------------
    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `/${id}`,
          method: 'POST',
          body: {
            _method: 'DELETE',
          },
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        // optimistic update: xóa ngay khỏi cache
        const feedPatchResults = removePostFromFeedCache(dispatch, getState, id);
        const repliesPatchResults = removePostFromRepliesCache(dispatch, getState, id);

        try {
          await queryFulfilled;
        } catch {
          // rollback nếu xóa lỗi
          feedPatchResults.forEach((undoPatch) => undoPatch.undo());
          repliesPatchResults.forEach((undoPatch) => undoPatch.undo());
        }
      },
    }),
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
    // GET POST DETAIL
    // ------------------------------------------------------------
    getPostDetail: builder.query({
      query: (id) => ({ url: `/${id}`, method: 'GET' }),
    }),
    // ------------------------------------------------------------
    // GET POST REPLIES
    // ------------------------------------------------------------
    getPostReplies: builder.query({
      query: ({ id, page }) => ({
        url: `/${id}/replies`,
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
        syncPostInRepliesCache(dispatch, getState, id, (post) => {
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
          syncPostInRepliesCache(dispatch, getState, id, (post) => {
            post.is_liked_by_auth = data.data.is_liked;
            post.likes_count = data.data.likes_count;
          });
        } catch {
          // Rollback nếu lỗi
          syncPostInFeedCache(dispatch, getState, id, (post) => {
            post.is_liked_by_auth = !post.is_liked_by_auth;
            post.likes_count += post.is_liked_by_auth ? 1 : -1;
          });
          syncPostInRepliesCache(dispatch, getState, id, (post) => {
            post.is_liked_by_auth = !post.is_liked_by_auth;
            post.likes_count += post.is_liked_by_auth ? 1 : -1;
          });
        }
      },
    }),
    // ------------------------------------------------------------
    // REPOST POST
    // ------------------------------------------------------------
    repostPost: builder.mutation({
      query: (id) => ({ url: `/${id}/repost`, method: 'POST' }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        // Optimistic update: toggle ngay UI
        syncPostInFeedCache(dispatch, getState, id, (post) => {
          post.is_reposted_by_auth = !post.is_reposted_by_auth;
          post.reposts_and_quotes_count += post.is_reposted_by_auth ? 1 : -1;
        });
        syncPostInRepliesCache(dispatch, getState, id, (post) => {
          post.is_reposted_by_auth = !post.is_reposted_by_auth;
          post.reposts_and_quotes_count += post.is_reposted_by_auth ? 1 : -1;
        });

        try {
          const { data } = await queryFulfilled;

          // Đồng bộ chính xác theo response server
          syncPostInFeedCache(dispatch, getState, id, (post) => {
            post.is_reposted_by_auth = data.data.is_reposted;
            post.reposts_and_quotes_count = data.data.reposts_and_quotes_count;
          });
          syncPostInRepliesCache(dispatch, getState, id, (post) => {
            post.is_reposted_by_auth = data.data.is_reposted;
            post.reposts_and_quotes_count = data.data.reposts_and_quotes_count;
          });
        } catch {
          // Rollback nếu lỗi
          syncPostInFeedCache(dispatch, getState, id, (post) => {
            post.is_reposted_by_auth = !post.is_reposted_by_auth;
            post.reposts_and_quotes_count += post.is_reposted_by_auth ? 1 : -1;
          });
          syncPostInRepliesCache(dispatch, getState, id, (post) => {
            post.is_reposted_by_auth = !post.is_reposted_by_auth;
            post.reposts_and_quotes_count += post.is_reposted_by_auth ? 1 : -1;
          });
        }
      },
    }),
    // ------------------------------------------------------------
    // SAVE POST
    // ------------------------------------------------------------
    savePost: builder.mutation({
      query: (id) => ({ url: `/${id}/save`, method: 'POST' }),
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        // Optimistic update: toggle ngay UI
        syncPostInFeedCache(dispatch, getState, id, (post) => {
          post.is_saved_by_auth = !post.is_saved_by_auth;
        });
        syncPostInRepliesCache(dispatch, getState, id, (post) => {
          post.is_saved_by_auth = !post.is_saved_by_auth;
        });

        try {
          const { data } = await queryFulfilled;

          // Đồng bộ chính xác theo response server
          syncPostInFeedCache(dispatch, getState, id, (post) => {
            post.is_saved_by_auth = data.data.is_saved;
          });
          syncPostInRepliesCache(dispatch, getState, id, (post) => {
            post.is_saved_by_auth = data.data.is_saved;
          });
        } catch {
          // Rollback nếu lỗi
          syncPostInFeedCache(dispatch, getState, id, (post) => {
            post.is_saved_by_auth = !post.is_saved_by_auth;
          });
          syncPostInRepliesCache(dispatch, getState, id, (post) => {
            post.is_saved_by_auth = !post.is_saved_by_auth;
          });
        }
      },
    }),
    // ------------------------------------------------------------
    // REPORT POST
    // ------------------------------------------------------------
    reportPost: builder.mutation({
      query: ({ id, reason, description }) => ({
        url: `/${id}/report`,
        method: 'POST',
        body: {
          reason,
          description: description || '',
        },
      }),
    }),
  }),
});

export const {
  useGetPostsFeedQuery,
  useLazyGetPostsFeedQuery,
  useLikePostMutation,
  useRepostPostMutation,
  useSavePostMutation,
  useReportPostMutation,
  useGetPostDetailQuery,
  useGetPostRepliesQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} = postsApi;

export default postsApi;
