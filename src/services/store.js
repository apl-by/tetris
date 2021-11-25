import { configureStore } from "@reduxjs/toolkit";
import mainReduser from "./slices/mainSlice";
import statReduser from "./slices/statSlice";
import gameControlReduser from "./slices/gameControlSlice";
let time = new Date().getTime();

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
    return saveToLocalStorage();
  }
  const currentTime = new Date().getTime();
  const delta = currentTime - time;

  if (delta > 1000) {
    time = currentTime;
    saveToLocalStorage();
  }
});
