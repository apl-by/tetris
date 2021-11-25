import { configureStore } from "@reduxjs/toolkit";
import mainReduser from "./slices/mainSlice";
import statReduser from "./slices/statSlice";
import gameControlReduser from "./slices/gameControlSlice";
import { setSaved } from "./slices/mainSlice";
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
  const { isRoundEnd, needSave } = store.getState().main;
  const { isPause, pressedBtn } = store.getState().gameControl;
  if (isRoundEnd || pressedBtn) return;
  if (isPause) {
    return saveToLocalStorage();
  }
  if (needSave) {
    store.dispatch(setSaved());
    return saveToLocalStorage();
  }
  const currentTime = new Date().getTime();
  const delta = currentTime - time;

  if (delta > 5000) {
    time = currentTime;
    saveToLocalStorage();
  }
});
