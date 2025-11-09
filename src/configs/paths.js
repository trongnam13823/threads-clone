const paths = {
  home: "/",
  search: "/search",
  activity: "/activity",
  following: "/following",
  ghostPosts: "/ghost-posts",

  profile: (username = ":username") => `/@/${username}`,
  profileReplies: (username = ":username") => `/@/${username}/replies`,
  profileMedia: (username = ":username") => `/@/${username}/media`,
  profileReposts: (username = ":username") => `/@/${username}/reposts`,
  postDetail: (username = ":username", id = ":id") => `/@/${username}/post/${id}`,
};

export default paths;
