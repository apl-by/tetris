const PIECES_CONFIG = {
  I: {
    base: {
      cells: [13, 14, 15, 16],
      checkLeft: [12],
      checkRight: [17],
      checkBottom: [23, 24, 25, 26],
    },
    left: {
      cells: [-6, 4, 14, 24],
      checkLeft: [-7, 3, 13, 23],
      checkRight: [-5, 5, 15, 25],
      checkBottom: [34],
    },
    reverse: {
      cells: [13, 14, 15, 16],
      checkLeft: [12],
      checkRight: [17],
      checkBottom: [23, 24, 25, 26],
    },
    right: {
      cells: [-6, 4, 14, 24],
      checkLeft: [-7, 3, 13, 23],
      checkRight: [-5, 5, 15, 25],
      checkBottom: [34],
    },
  },
  O: {
    base: {
      cells: [4, 5, 14, 15],
      checkLeft: [3, 13],
      checkRight: [6, 16],
      checkBottom: [24, 25],
    },
    left: {
      cells: [4, 5, 14, 15],
      checkLeft: [3, 13],
      checkRight: [6, 16],
      checkBottom: [24, 25],
    },
    reverse: {
      cells: [4, 5, 14, 15],
      checkLeft: [3, 13],
      checkRight: [6, 16],
      checkBottom: [24, 25],
    },
    right: {
      cells: [4, 5, 14, 15],
      checkLeft: [3, 13],
      checkRight: [6, 16],
      checkBottom: [24, 25],
    },
  },
  L: {
    base: {
      cells: [6, 14, 15, 16],
      checkLeft: [5, 13],
      checkRight: [7, 17],
      checkBottom: [24, 25, 26],
    },
    left: {
      cells: [4, 5, 15, 25],
      checkLeft: [3, 14, 24],
      checkRight: [6, 16, 26],
      checkBottom: [14, 35],
    },
    reverse: {
      cells: [4, 5, 6, 14],
      checkLeft: [3, 13],
      checkRight: [7, 15],
      checkBottom: [15, 16, 24],
    },
    right: {
      cells: [4, 14, 24, 25],
      checkLeft: [3, 13, 23],
      checkRight: [5, 15, 26],
      checkBottom: [34, 35],
    },
  },
  J: {
    base: {
      cells: [4, 14, 15, 16],
      checkLeft: [3, 13],
      checkRight: [5, 17],
      checkBottom: [24, 25, 26],
    },
    left: {
      cells: [5, 15, 24, 25],
      checkLeft: [4, 14, 23],
      checkRight: [6, 16, 26],
      checkBottom: [34, 35],
    },
    reverse: {
      cells: [4, 5, 6, 16],
      checkLeft: [3, 15],
      checkRight: [7, 17],
      checkBottom: [14, 15, 26],
    },
    right: {
      cells: [4, 5, 14, 24],
      checkLeft: [3, 13, 23],
      checkRight: [6, 15, 25],
      checkBottom: [15, 34],
    },
  },
  S: {
    base: {
      cells: [5, 6, 14, 15],
      checkLeft: [4, 13],
      checkRight: [7, 16],
      checkBottom: [16, 24, 25],
    },
    left: {
      cells: [4, 14, 15, 25],
      checkLeft: [3, 13, 24],
      checkRight: [5, 16, 26],
      checkBottom: [24, 35],
    },
    reverse: {
      cells: [5, 6, 14, 15],
      checkLeft: [4, 13],
      checkRight: [7, 16],
      checkBottom: [16, 24, 25],
    },
    right: {
      cells: [4, 14, 15, 25],
      checkLeft: [3, 13, 24],
      checkRight: [5, 16, 26],
      checkBottom: [24, 35],
    },
  },
  Z: {
    base: {
      cells: [4, 5, 15, 16],
      checkLeft: [3, 14],
      checkRight: [6, 17],
      checkBottom: [14, 25, 26],
    },
    left: {
      cells: [6, 15, 16, 25],
      checkLeft: [5, 14, 24],
      checkRight: [7, 17, 26],
      checkBottom: [26, 35],
    },
    reverse: {
      cells: [4, 5, 15, 16],
      checkLeft: [3, 14],
      checkRight: [6, 17],
      checkBottom: [14, 25, 26],
    },
    right: {
      cells: [6, 15, 16, 25],
      checkLeft: [5, 14, 24],
      checkRight: [7, 17, 26],
      checkBottom: [26, 35],
    },
  },
  T: {
    base: {
      cells: [5, 14, 15, 16],
      checkLeft: [4, 13],
      checkRight: [6, 17],
      checkBottom: [24, 25, 26],
    },
    left: {
      cells: [5, 14, 15, 25],
      checkLeft: [4, 13, 24],
      checkRight: [6, 16, 26],
      checkBottom: [24, 35],
    },
    reverse: {
      cells: [4, 5, 6, 15],
      checkLeft: [3, 14],
      checkRight: [7, 16],
      checkBottom: [14, 16, 25],
    },
    right: {
      cells: [5, 15, 16, 25],
      checkLeft: [4, 14, 24],
      checkRight: [6, 17, 26],
      checkBottom: [26, 35],
    },
  },
};

export default PIECES_CONFIG;
