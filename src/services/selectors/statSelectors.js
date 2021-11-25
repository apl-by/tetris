export const statSelectors = {
  score: (state) => state.stat.score,
  record: (state) => state.stat.record,
  lines: (state) => state.stat.lines,
  level: (state) => state.stat.level,
  speed: (state) => state.stat.levelConfig.speed,
};
