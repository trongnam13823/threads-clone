import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../createBaseQuery';
import { SEARCH_TYPES } from '@/constants/searchType';

const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: createBaseQuery(''),
  tagTypes: [SEARCH_TYPES.USER_SUGGESTIONS, SEARCH_TYPES.TOPIC_SEARCH, SEARCH_TYPES.GLOBAL_SEARCH],
  endpoints: (builder) => ({
    // =====================================================
    // USER SUGGESTIONS (infinite scroll)
    // =====================================================
    getUserSuggestion: builder.query({
      query: ({ page = 1, per_page = 10 } = {}) => ({
        url: '/users/suggestions',
        params: { page, per_page },
      }),
      serializeQueryArgs: ({ endpointName }) => `${endpointName}-${SEARCH_TYPES.USER_SUGGESTIONS}`,
      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) return newData;
        currentCache.data.push(...newData.data);
        currentCache.pagination = newData.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg) return false;
        return currentArg.page !== previousArg?.page;
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((user) => ({
                type: SEARCH_TYPES.USER_SUGGESTIONS,
                id: user.id,
              })),
              { type: SEARCH_TYPES.USER_SUGGESTIONS, id: 'LIST' },
            ]
          : [{ type: SEARCH_TYPES.USER_SUGGESTIONS, id: 'LIST' }],
    }),

    // =====================================================
    // TOPIC SEARCH (no infinite scroll)
    // =====================================================
    searchTopics: builder.query({
      query: ({ q }) => ({
        url: '/topics/search',
        params: { q },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.q}`,
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg) return false;
        return currentArg.q !== previousArg?.q;
      },
      providesTags: [{ type: SEARCH_TYPES.TOPIC_SEARCH, id: 'LIST' }],
    }),

    // =====================================================
    // GLOBAL SEARCH (infinite scroll)
    // =====================================================
    searchAll: builder.query({
      query: ({ q, page = 1, per_page_topics = 10, per_page_users = 10 }) => ({
        url: '/search',
        params: { q, page, per_page_topics, per_page_users },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.q}`, // cache key theo q
      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) return newData;
        currentCache.data.topics.push(...newData.data.topics);
        currentCache.data.users.push(...newData.data.users);
        currentCache.pagination = newData.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg) return false;
        return currentArg.q !== previousArg?.q || currentArg.page !== previousArg?.page;
      },
      providesTags: [{ type: SEARCH_TYPES.GLOBAL_SEARCH, id: 'LIST' }],
    }),
  }),
});

export const {
  useGetUserSuggestionQuery,
  useLazyGetUserSuggestionQuery,
  useSearchTopicsQuery,
  useLazySearchTopicsQuery,
  useSearchAllQuery,
  useLazySearchAllQuery,
} = searchApi;

export default searchApi;
