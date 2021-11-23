export const gameControlSelectors = {
  isPause: (state) => state.gameControl.isPause,
  isGameOn: (state) => state.gameControl.isGameOn,
  isGameOver: (state) => state.gameControl.isGameOver,
  isRoundEnd: (state) => state.gameControl.isRoundEnd,
  pressedKey: (state) => state.gameControl.pressedKey,
};
