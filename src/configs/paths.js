const paths = {
  home: "/",
  following: "/following",
  ghostPosts: "/ghost-posts",

  search: "/search",

  // Profile
  profile: (username = ":username") => `/@/${username}`,
  profileReplies: (username = ":username") => `/@/${username}/replies`,
  profileMedia: (username = ":username") => `/@/${username}/media`,
  profileReposts: (username = ":username") => `/@/${username}/reposts`,
  postDetail: (username = ":username", id = ":id") => `/@/${username}/post/${id}`,

  // Activity filters
  activity: "/activity",
  activityFollows: "/activity/follows",
  activityReplies: "/activity/replies",
  activityMentions: "/activity/mentions",
  activityQuotes: "/activity/quotes",
  activityReposts: "/activity/reposts",
  activityVerified: "/activity/verified",
};

export default paths;
