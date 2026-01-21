export const API_URL = 'https://threads.f8team.dev/api'

// Các base path tái sử dụng
const BASE_PATHS = {
  activity: '/activity',
  profile: '/@',
  auth: '/auth', // nếu muốn gom các endpoint auth
  post: '/post',
};

// Helper functions
const profilePath = (username) => `${BASE_PATHS.profile}/${username}`;
const activityPath = (type) => `${BASE_PATHS.activity}${type ? `/${type}` : ''}`;

export default {
  // Auth
  register: `${BASE_PATHS.auth}/register`,
  sendVerifyEmail: `${BASE_PATHS.auth}/send-verify-email`,
  verifyEmail: `${BASE_PATHS.auth}/verify-email`,
  login: `${BASE_PATHS.auth}/login`,
  forgotPassword: `${BASE_PATHS.auth}/forgot-password`,
  resetPassword: `${BASE_PATHS.auth}/reset-password`,

  // Pages
  home: '/',
  forYou: '/for-you',
  following: '/following',
  ghostPosts: '/ghost-posts',
  search: '/search',

  // Activity
  activity: BASE_PATHS.activity,
  activityFollows: activityPath('follows'),
  activityReplies: activityPath('replies'),
  activityMentions: activityPath('mentions'),
  activityQuotes: activityPath('quotes'),
  activityReposts: activityPath('reposts'),
  activityVerified: activityPath('verified'),

  // Profile
  profile: profilePath,
  profileReplies: (username) => `${profilePath(username)}/replies`,
  profileMedia: (username) => `${profilePath(username)}/media`,
  profileReposts: (username) => `${profilePath(username)}/reposts`,

  // Post Detail
  postDetail: (postId) => `${BASE_PATHS.post}/${postId}`,
  postEmbed: (postId) => `${BASE_PATHS.post}/${postId}/embed`,
};
