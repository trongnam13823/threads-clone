import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from '../createBaseQuery';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: createBaseQuery('/auth'),
  endpoints: (builder) => ({
    validateUsername: builder.mutation({
      query: (username) => ({
        url: '/validate/username',
        method: 'POST',
        body: { username },
      }),
    }),

    validateEmail: builder.mutation({
      query: (email) => ({
        url: '/validate/email',
        method: 'POST',
        body: { email },
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),

    resendVerificationEmail: builder.mutation({
      query: () => ({
        url: '/resend-verification-email',
        method: 'POST',
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: '/verify-email',
        method: 'POST',
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    validateResetToken: builder.query({
      query: (token) => ({
        url: '/reset-password/validate',
        method: 'GET',
        params: { token },
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/reset-password',
        method: 'POST',
        body: data,
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useValidateUsernameMutation,
  useValidateEmailMutation,
  useResendVerificationEmailMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useValidateResetTokenQuery,
  useResetPasswordMutation,
  useUserInfoQuery,
  useLazyUserInfoQuery,
} = authApi;

export default authApi;
