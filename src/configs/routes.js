import DefaultLayout from "@/layouts/DefaultLayout";
import HomeLayout from "@/layouts/HomeLayout";
import paths from "./paths";
import FollowingPage from "@/pages/Home/FollowingPage";
import ActivityLayout from "@/layouts/ActivityLayout";
import ActivityPage from "@/pages/Activity";
import ActivityFollowsPage from "@/pages/Activity/ActivityFollowsPage";
import SearchPage from "@/pages/Search";
import ProfileLayout from "@/layouts/ProfileLayout";
import ProfilePage from "@/pages/Profile";
import ProfileRepliesPage from "@/pages/Profile/ProfileRepliesPage";
import ForYouPage from "@/pages/Home/ForYouPage";

export default [
  {
    path: paths.home,
    Component: DefaultLayout,
    children: [
      {
        Component: HomeLayout,
        children: [
          {
            path: paths.forYou,
            Component: ForYouPage,
          },
          {
            path: paths.following,
            Component: FollowingPage,
          },
        ],
      },
      {
        path: paths.search,
        Component: SearchPage,
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
        ],
      },
      {
        Component: ProfileLayout,
        children: [
          {
            path: paths.profile(":username"),
            Component: ProfilePage,
          },
          {
            path: paths.profileReplies(":username"),
            Component: ProfileRepliesPage,
          },
        ],
      },
    ],
  },
];
