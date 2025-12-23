import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa hằng số trạng thái
export const SplashStatus = {
  FADING_IN: "FADING_IN",
  FADING_IN_DONE: "FADING_IN_DONE",
  FADING_OUT: "FADING_OUT",
  FADING_OUT_DONE: "FADING_OUT_DONE",
};

const initialState = {
  status: SplashStatus.FADING_IN,
};

export const splashSlice = createSlice({
  name: "splash",
  initialState,
  reducers: {
    setSplashFadingIn: (state) => {
      state.status = SplashStatus.FADING_IN;
    },
    setSplashFadingInDone: (state) => {
      state.status = SplashStatus.FADING_IN_DONE;
    },
    setSplashFadingOut: (state) => {
      state.status = SplashStatus.FADING_OUT;
    },
    setSplashFadingOutDone: (state) => {
      state.status = SplashStatus.FADING_OUT_DONE;
    },
  },
});

// Export actions
export const { setSplashFadingIn, setSplashFadingInDone, setSplashFadingOut, setSplashFadingOutDone } =
  splashSlice.actions;

// Export reducer
export default splashSlice;
