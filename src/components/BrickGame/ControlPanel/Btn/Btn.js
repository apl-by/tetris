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
  isTablet,
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
      onMouseDown={!isTablet ? onDown : null}
      onMouseUp={!isTablet ? onUp : null}
      onTouchStart={isTablet ? onDown : null}
      onTouchEnd={isTablet ? onUp : null}
    ></button>
  );
}

export default Btn;
