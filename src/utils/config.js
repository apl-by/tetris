export const PIECES_TYPES = ["I", "O", "L", "J", "S", "Z", "T"];

// Стартовые номера ячеек игровой области, в которые устанавливается фигура
// (для создания игрового поля в области stat)
export const BASE_NUM = [3, 4, 5, 6, 13, 14, 15, 16];

export const MOVE_BUTTONS = ["left", "right", "down", "turn", "drop"];

export const CONTROL_KEYS = {
  pause: ["p", "P", "з", "З"],
  reset: ["r", "R", "к", "К"],
  left: ["ArrowLeft", "a", "A", "ф", "Ф"],
  right: ["ArrowRight", "d", "D", "в", "В"],
  down: ["ArrowDown", "s", "S", "ы", "Ы"],
  turn: ["ArrowUp", "w", "W", "ц", "Ц"],
  drop: [32],
};

export const GH_LINK = "https://github.com/apl-by/tetris";
