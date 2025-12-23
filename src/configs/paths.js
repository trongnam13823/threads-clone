const activity = "/activity";
const profile = "/@";

export const API_URL = import.meta.env.VITE_API_URL;

export default {
  register: "/register",
  sendVerifyEmail: "/send-verify-email",
  verifyEmail: "/verify-email",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  home: "/",

  forYou: "/for-you",
  following: "/following",

  search: "/search",

  activity,
  activityFollows: activity + "/follows",

  profile: (username) => profile + `/${username}`,
  profileReplies: (username) => profile + `/${username}/replies`,
};
