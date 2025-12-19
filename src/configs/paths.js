const activity = "/activity";
const profile = "/@";

export default {
  home: "/",

  forYou: "/for-you",
  following: "/following",

  search: "/search",

  activity,
  activityFollows: activity + "/follows",

  profile: (username) => profile + `/${username}`,
  profileReplies: (username) => profile + `/${username}/replies`,
};
