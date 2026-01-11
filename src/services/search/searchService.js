import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../createBaseQuery';

const searchService = createApi({
  reducerPath: 'searchService',
  baseQuery: createBaseQuery(''),
  endpoints: (builder) => ({
    // ------------------------------------------------------------
    // USER SUGGESTIONS
    // ------------------------------------------------------------
    getUserSuggestion: builder.query({
      query: ({ page }) => ({
        url: '/users/suggestions',
        params: { page },
      }),
      serializeQueryArgs: ({ endpointName }) => `${endpointName}`,
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
    // GLOBAL SEARCH
    // ------------------------------------------------------------
    searchAll: builder.query({
      query: ({ q, page }) => ({
        url: '/search',
        params: { q, page },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.q}`,
      merge: (currentCache, newData, { arg }) => {
        if (arg.page === 1) return newData;
        currentCache.data.topics.push(...newData.data.topics);
        currentCache.data.users.push(...newData.data.users);
        currentCache.pagination = newData.pagination;
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg) return false;
        return (
          (currentArg.page === 1 && previousArg.page > 1) ||
          currentArg.q !== previousArg?.q ||
          currentArg.page > previousArg.page
        );
      },
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
} = searchService;

export default searchService;
