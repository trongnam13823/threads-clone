import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { ActivityPage } from "./pages/ActivityPage";
import { ProfilePage } from "./pages/ProfilePage";
import { FollowingPage } from "./pages/FollowingPage";
import { GhostPostsPage } from "./pages/GhostPostsPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import paths from "./configs/paths";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { HomeLayout } from "./layouts/HomeLayout";
import { ProfileLayout } from "./layouts/ProfileLayout";
import { profileMediaPage } from "./pages/profileMediaPage";
import { profileRepostsPage } from "./pages/profileRepostsPage";
import { ProfileRepliesPage } from "./pages/ProfileRepliesPage";

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
        path: paths.activity,
        Component: ActivityPage,
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
            Component: profileMediaPage,
          },
          {
            path: paths.profileReposts(),
            Component: profileRepostsPage,
          },
          {
            path: paths.profileReplies(),
            Component: ProfileRepliesPage,
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
