import DefaultLayout from '@/layouts/DefaultLayout';
import paths from './paths';
import ActivityLayout from '@/layouts/ActivityLayout';
import ActivityPage from '@/pages/Activity';
import ActivityFollowsPage from '@/pages/Activity/ActivityFollowsPage';
import SearchPage from '@/pages/Search';
import ProfileLayout from '@/layouts/ProfileLayout';
import ProfilePage from '@/pages/Profile';
import ProfileRepliesPage from '@/pages/Profile/ProfileRepliesPage';
import ProfileMediaPage from '@/pages/Profile/ProfileMediaPage';
import ProfileRepostsPage from '@/pages/Profile/ProfileRepostsPage';
import ForYouPage from '@/pages/Home/ForYouPage';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import ForgotPasswordPage from '@/pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/Auth/ResetPasswordPage';
import VerifyEmailPage from '@/pages/Auth/VerifyEmailPage';
import SendVerifyEmailPage from '@/pages/Auth/SendVerifyEmailPage';
import GuestLayout from '@/layouts/GuestLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import SearchLayout from '@/layouts/SearchLayout';
import FollowingPage from '@/pages/Home/FollowingPage';
import HomePage from '@/pages/Home';
import GhostPosts from '@/pages/Home/GhostPosts';
import HomeLayout from '@/layouts/HomeLayout';
import ActivityRepliesPage from '@/pages/Activity/ActivityRepliesPage';
import ActivityMentionsPage from '@/pages/Activity/ActivityMentionsPage';
import ActivityQuotesPage from '@/pages/Activity/ActivityQuotesPage';
import ActivityRepostsPage from '@/pages/Activity/ActivityRepostsPage';
import ActivityVerifiedPage from '@/pages/Activity/ActivityVerifiedPage';

export default [
  {
    Component: AuthLayout,
    children: [
      {
        path: paths.verifyEmail,
        Component: VerifyEmailPage,
      },
      {
        path: paths.resetPassword,
        Component: ResetPasswordPage,
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
            Component: LoginPage,
          },
          {
            path: paths.register,
            Component: RegisterPage,
          },

          {
            path: paths.forgotPassword,
            Component: ForgotPasswordPage,
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
            Component: SendVerifyEmailPage,
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
                Component: FollowingPage,
              },
              {
                path: paths.forYou,
                Component: ForYouPage,
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
            Component: ProfileLayout,
            children: [
              {
                path: paths.profile(':username'),
                Component: ProfilePage,
              },
              {
                path: paths.profileReplies(':username'),
                Component: ProfileRepliesPage,
              },
              {
                path: paths.profileMedia(':username'),
                Component: ProfileMediaPage,
              },
              {
                path: paths.profileReposts(':username'),
                Component: ProfileRepostsPage,
              },
            ],
          },
        ],
      },
    ],
  },
];
