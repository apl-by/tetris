import "./Btn.scss";
import cn from "classnames";

function Btn({
  type,
  ariaLabel,
  modSize,
  modColor,
  modShadow,
  mix,
  onDown,
  onUp,
}) {
  const cnBtn = cn(
    "btn",
    {
      [`btn_size_${modSize}`]: modSize,
      [`btn_color_${modColor}`]: modColor,
      [`btn_shadow_${modShadow}`]: modShadow,
    },
    { [`${mix}`]: mix }
  );

  return (
    <button
      className={cnBtn}
      type={type}
      aria-label={ariaLabel}
      onMouseDown={onDown}
      onMouseUp={onUp}
      onTouchStart={onDown}
      onTouchEnd={onUp}
    ></button>
  );
}

export default Btn;
