import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { useUserInfoQuery } from "@/services/auth/authApi";
import { SplashStatus, setSplashFadingOut } from "@/features/splash/splashSlice";
import { setUserInfo } from "@/features/auth/authSlice";
import { useEffect } from "react";
import Splash from "../components/Splash";
import paths from "@/configs/paths";

function GuestLayout() {
  const dispatch = useDispatch();

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

  return userInfo ? <Navigate to={paths.home} replace /> : <Outlet />;
}

export default GuestLayout;
