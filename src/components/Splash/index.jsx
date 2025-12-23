import { setSplashFadingInDone, setSplashFadingOutDone, SplashStatus } from "@/features/splash/splashSlice";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../Logo";

const DURATION = 300;
const ANIMATION = {
  [SplashStatus.FADING_IN]: `splash-in ${DURATION}ms ease-in-out forwards`,
  [SplashStatus.FADING_OUT]: `splash-out ${DURATION}ms ease-in-out forwards`,
};

const Splash = () => {
  const dispatch = useDispatch();
  const splashState = useSelector((state) => state.splash.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Logo
        size={120}
        style={{ animation: ANIMATION[splashState] }}
        onAnimationEnd={() => {
          if (splashState === SplashStatus.FADING_IN) {
            dispatch(setSplashFadingInDone());
          } else if (splashState === SplashStatus.FADING_OUT) {
            dispatch(setSplashFadingOutDone());
          }
        }}
      />
    </div>
  );
};

export default Splash;
