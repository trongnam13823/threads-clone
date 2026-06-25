import DefaultLayout from '@/layouts/DefaultLayout';
import paths from './paths';
import ActivityLayout from '@/layouts/ActivityLayout';
import ActivityPage from '@/pages/Activity';
import ActivityFollows from '@/pages/Activity/ActivityFollows';
import SearchPage from '@/pages/Search';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePage from '@/pages/Profile';
import ProfileReplies from '@/pages/Profile/ProfileReplies';
import ProfileMedia from '@/pages/Profile/ProfileMedia';
import ProfileReposts from '@/pages/Profile/ProfileReposts';
import ForYou from '@/pages/Home/ForYou';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import ResetPassword from '@/pages/Auth/ResetPassword';
import VerifyEmail from '@/pages/Auth/VerifyEmail';
import SendVerifyEmail from '@/pages/Auth/SendVerifyEmail';
import GuestLayout from '@/layouts/GuestLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import SearchLayout from '@/layouts/SearchLayout';
import Following from '@/pages/Home/Following';
import HomePage from '@/pages/Home';
import GhostPosts from '@/pages/Home/GhostPosts';
import HomeLayout from '@/layouts/HomeLayout';
import ActivityReplies from '@/pages/Activity/ActivityReplies';
import ActivityMentions from '@/pages/Activity/ActivityMentions';
import ActivityQuotes from '@/pages/Activity/ActivityQuotes';
import ActivityReposts from '@/pages/Activity/ActivityReposts';
import ActivityVerified from '@/pages/Activity/ActivityVerified';
import PostEmbed from '@/pages/Embed/PostEmbed';
import RootLayout from '@/layouts/RootLayout';
import PostDetailLayout from '@/layouts/PostDetailLayout';
import PostDetail from '@/pages/Post/PostDetail';
import { redirect } from 'react-router';

export default [
  {
    Component: RootLayout,
    children: [
      {
        path: paths.postEmbed(':postId'),
        Component: PostEmbed,
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: paths.verifyEmail,
            Component: VerifyEmail,
          },
          {
            path: paths.resetPassword,
            Component: ResetPassword,
          },
          {
            path: paths.resetPasswordLegacy,
            loader: ({ request }) => redirect(`${paths.resetPassword}${new URL(request.url).search}`),
          },
        ],
      },

      {
        Component: GuestLayout,
        children: [
          {
            Component: AuthLayout,
            children: [
              {
                path: paths.login,
                Component: Login,
              },
              {
                path: paths.register,
                Component: Register,
              },

              {
                path: paths.forgotPassword,
                Component: ForgotPassword,
              },
            ],
          },
        ],
      },

      {
        Component: ProtectedLayout,
        children: [
          {
            Component: AuthLayout,
            children: [
              {
                path: paths.sendVerifyEmail,
                Component: SendVerifyEmail,
              },
            ],
          },
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
                    Component: Following,
                  },
                  {
                    path: paths.forYou,
                    Component: ForYou,
                  },
                  {
                    path: paths.ghostPosts,
                    Component: GhostPosts,
                  },
                ],
              },
              {
                Component: SearchLayout,
                children: [
                  {
                    path: paths.search,
                    Component: SearchPage,
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
                    Component: ActivityFollows,
                  },
                  {
                    path: paths.activityReplies,
                    Component: ActivityReplies,
                  },
                  {
                    path: paths.activityMentions,
                    Component: ActivityMentions,
                  },
                  {
                    path: paths.activityQuotes,
                    Component: ActivityQuotes,
                  },
                  {
                    path: paths.activityReposts,
                    Component: ActivityReposts,
                  },
                  {
                    path: paths.activityVerified,
                    Component: ActivityVerified,
                  },
                ],
              },
              {
                Component: ProfileLayout,
                children: [
                  {
                    path: paths.profile(':username'),
                    Component: ProfilePage,
                  },
                  {
                    path: paths.profileReplies(':username'),
                    Component: ProfileReplies,
                  },
                  {
                    path: paths.profileMedia(':username'),
                    Component: ProfileMedia,
                  },
                  {
                    path: paths.profileReposts(':username'),
                    Component: ProfileReposts,
                  },
                ],
              },
              {
                Component: PostDetailLayout,
                children: [
                  {
                    path: paths.postDetail(':postId'),
                    Component: PostDetail,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
