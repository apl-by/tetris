import { configureStore } from "@reduxjs/toolkit";
import mainReduser from "./slices/mainSlice";
import statReduser from "./slices/statSlice";
import gameControlReduser from "./slices/gameControlSlice";

export const store = configureStore({
  reducer: {
    main: mainReduser,
    stat: statReduser,
    gameControl: gameControlReduser,
  },
  devTools: true,
});
