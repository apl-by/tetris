export const mainSelectors = {
  playArea: (state) => state.main.playArea,
  statArea: (state) => state.main.statArea,
  all: (state) => state.main.pieces.all,
  current: (state) => state.main.pieces.current,
  next: (state) => state.main.pieces.next,
  position: (state) => state.main.position,
  isRoundEnd: (state) => state.main.isRoundEnd,
};
