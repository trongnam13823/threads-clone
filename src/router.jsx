import { createBrowserRouter } from "react-router";

import paths from "./configs/paths";
import { DefaultLayout } from "./layouts/DefaultLayout";

import { SearchPage } from "./pages/SearchPage";
import { PostDetailPage } from "./pages/PostDetailPage";

import { HomeLayout } from "./layouts/HomeLayout";
import { HomePage } from "./pages/Home";
import { FollowingPage } from "./pages/Home/FollowingPage";
import { GhostPostsPage } from "./pages/Home/GhostPostsPage";

import { ProfileLayout } from "./layouts/ProfileLayout";
import { ProfilePage } from "./pages/Profile";
import { ProfileMediaPage } from "./pages/Profile/ProfileMediaPage";
import { ProfileRepostsPage } from "./pages/Profile/ProfileRepostsPage";
import { ProfileRepliesPage } from "./pages/Profile/ProfileRepliesPage";

import { ActivityLayout } from "./layouts/ActivityLayout";
import { ActivityPage } from "./pages/Activity/";
import ActivityFollowsPage from "./pages/Activity/ActivityFollows";
import ActivityRepliesPage from "./pages/Activity/ActivityReplies";
import ActivityMentionsPage from "./pages/Activity/ActivityMentions";
import ActivityQuotesPage from "./pages/Activity/ActivityQuotes";
import ActivityRepostsPage from "./pages/Activity/ActivityReposts";
import ActivityVerifiedPage from "./pages/Activity/ActivityVerified";

const router = createBrowserRouter([
  {
    Component: DefaultLayout,
    children: [
      {
        Component: HomeLayout,
        children: [
          {
            path: paths.home,
            Component: HomePage,
          },
          {
            path: paths.following,
            Component: FollowingPage,
          },
          {
            path: paths.ghostPosts,
            Component: GhostPostsPage,
          },
        ],
      },
      {
        path: paths.search,
        Component: SearchPage,
      },
      {
        Component: ProfileLayout,
        children: [
          {
            path: paths.profile(),
            Component: ProfilePage,
          },
          {
            path: paths.profileMedia(),
            Component: ProfileMediaPage,
          },
          {
            path: paths.profileReposts(),
            Component: ProfileRepostsPage,
          },
          {
            path: paths.profileReplies(),
            Component: ProfileRepliesPage,
          },
        ],
      },

      {
        Component: ActivityLayout,
        children: [
          {
            path: paths.activity,
            Component: ActivityPage,
          },
          {
            path: paths.activityFollows,
            Component: ActivityFollowsPage,
          },
          {
            path: paths.activityReplies,
            Component: ActivityRepliesPage,
          },
          {
            path: paths.activityMentions,
            Component: ActivityMentionsPage,
          },
          {
            path: paths.activityQuotes,
            Component: ActivityQuotesPage,
          },
          {
            path: paths.activityReposts,
            Component: ActivityRepostsPage,
          },
          {
            path: paths.activityVerified,
            Component: ActivityVerifiedPage,
          },
        ],
      },

      {
        path: paths.postDetail(),
        Component: PostDetailPage,
      },
    ],
  },
]);

export default router;
