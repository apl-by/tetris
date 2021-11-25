import { configureStore } from "@reduxjs/toolkit";
import mainReduser from "./slices/mainSlice";
import statReduser from "./slices/statSlice";
import gameControlReduser from "./slices/gameControlSlice";
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
  devTools: false,
});

const saveToLocalStorage = () =>
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));

store.subscribe(() => {
  const isRoundEnd = store.getState().main.isRoundEnd;
  const isPause = store.getState().gameControl.isPause;
  if (isRoundEnd) return;
  if (isPause) {
    saveToLocalStorage();
  }
  throttle(saveToLocalStorage, 1000);
});
