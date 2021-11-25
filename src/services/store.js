import { configureStore } from "@reduxjs/toolkit";
import mainReduser from "./slices/mainSlice";
import statReduser from "./slices/statSlice";
import gameControlReduser from "./slices/gameControlSlice";
import { setSaved } from "./slices/mainSlice";
import throttle from "lodash/throttle";

const preloadedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    main: mainReduser,
    stat: statReduser,
    gameControl: gameControlReduser,
  },
  preloadedState,
  devTools: true,
});

const saveToLocalStorage = () =>
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));

store.subscribe(() => {
  const { isRoundEnd, isNeedSave } = store.getState().main;
  const isPause = store.getState().gameControl.isPause;
  if (isRoundEnd) return;
  if (isNeedSave) {
    saveToLocalStorage();
    store.dispatch(setSaved());
  }
  if (isPause) {
    saveToLocalStorage();
  }
  throttle(saveToLocalStorage, 1000);
});
