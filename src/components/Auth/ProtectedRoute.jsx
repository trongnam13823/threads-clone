import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { useUserInfoQuery } from "@/services/auth/authApi";
import { SplashStatus, setSplashFadingOut } from "@/features/splash/splashSlice";
import { useEffect } from "react";
import { setUserInfo } from "@/features/auth/authSlice";
import Splash from "../Splash";
import paths from "@/configs/paths";

function ProtectedRoute() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const { data: userQuery, isLoading } = useUserInfoQuery(null, { skip: !!userInfo });
  const splashState = useSelector((state) => state.splash.status);

  // Splash chỉ chạy 1 lần duy nhất
  useEffect(() => {
    if (!isLoading && splashState === SplashStatus.FADING_IN_DONE) {
      dispatch(setSplashFadingOut());

      if (userQuery) dispatch(setUserInfo(userQuery));
    }
  }, [splashState, isLoading]);

  if (splashState !== SplashStatus.FADING_OUT_DONE) return <Splash />;
  // ---------- Splash ----------
  if (userInfo && !userInfo.verified && pathname !== paths.sendVerifyEmail) {
    return <Navigate to={paths.sendVerifyEmail} replace />;
  }

  return userInfo ? <Outlet /> : <Navigate to={paths.login} replace />;
}

export default ProtectedRoute;
