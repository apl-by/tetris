export const gameControlSelectors = {
  isPause: (state) => state.gameControl.isPause,
  isGameOn: (state) => state.gameControl.isGameOn,
  isGameOver: (state) => state.gameControl.isGameOver,
  pressedBtn: (state) => state.gameControl.pressedBtn,
};
