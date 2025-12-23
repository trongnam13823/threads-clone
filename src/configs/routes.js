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
import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import GuestRoute from "@/components/Auth/GuestRoute";
import ForgotPasswordPage from "@/pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage";
import VerifyEmailPage from "@/pages/Auth/VerifyEmailPage";
import SendVerifyEmailPage from "@/pages/Auth/SendVerifyEmailPage";

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
    Component: GuestRoute,
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
    Component: ProtectedRoute,
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
    ],
  },
];
