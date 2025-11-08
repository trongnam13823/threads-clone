const paths = {
  home: "/",
  search: "/search",
  activity: "/activity",
  following: "/following",
  ghostPosts: "/ghost-posts",

  profile: (username = ":username") => `/user/${username}`,
  profileReplies: (username = ":username") => `/user/${username}/replies`,
  profileMedia: (username = ":username") => `/user/${username}/media`,
  profileReposts: (username = ":username") => `/user/${username}/reposts`,
  postDetail: (username = ":username", id = ":id") => `/user/${username}/post/${id}`,
};

export default paths;
