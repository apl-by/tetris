import "./ControlPanel.scss";
import Btn from "./Btn/Btn";
import { gameControlSelectors } from "../../../services/selectors";
import { useSelector } from "react-redux";

function ControlPanel({ onDown, onUp, isTablet }) {
  const pressedBtn = useSelector(gameControlSelectors.pressedBtn);
  const modShadow =
    pressedBtn === ""
      ? null
      : ["reset", "pause"].includes(pressedBtn)
      ? "reverse-s"
      : "reverse-m";

  return (
    <div className="control-panel">
      <div className="control-panel__main">
        <Btn
          type="button"
          ariaLabel="влево"
          modSize={isTablet ? "mobile" : "m"}
          modColor="yellow"
          modShadow={pressedBtn === "left" ? modShadow : null}
          mix="control-panel__left"
          onDown={() => onDown("left")}
          onUp={() => onUp()}
          isTablet={isTablet}
        />
        <Btn
          type="button"
          ariaLabel="вниз"
          modSize={isTablet ? "mobile" : "m"}
          modColor="yellow"
          modShadow={pressedBtn === "down" ? modShadow : null}
          mix="control-panel__down"
          onDown={() => onDown("down")}
          onUp={() => onUp()}
          isTablet={isTablet}
        />
        <Btn
          type="button"
          ariaLabel="повернуть"
          modSize={isTablet ? "mobile" : "m"}
          modColor="yellow"
          modShadow={pressedBtn === "turn" ? modShadow : null}
          mix="control-panel__up"
          onDown={() => onDown("turn")}
          onUp={() => onUp()}
          isTablet={isTablet}
        />
        <Btn
          type="button"
          ariaLabel="вправо"
          modSize={isTablet ? "mobile" : "m"}
          modColor="yellow"
          modShadow={pressedBtn === "right" ? modShadow : null}
          mix="control-panel__right"
          onDown={() => onDown("right")}
          onUp={() => onUp()}
          isTablet={isTablet}
        />
      </div>
      <div className="control-panel__top">
        <Btn
          type="button"
          ariaLabel="кнопка сбросить"
          modSize="s"
          modColor="red"
          modShadow={pressedBtn === "reset" ? modShadow : null}
          mix="control-panel__small-btn"
          onDown={() => onDown("reset")}
          onUp={() => onUp()}
          isTablet={isTablet}
        />
        <Btn
          type="button"
          ariaLabel="кнопка пауза/старт"
          modSize="s"
          modColor="green"
          modShadow={pressedBtn === "pause" ? modShadow : null}
          mix="control-panel__small-btn"
          onDown={() => onDown("pause")}
          onUp={() => onUp()}
          isTablet={isTablet}
        />
        <Btn
          type="button"
          ariaLabel="кнопка уронить"
          modSize={isTablet ? "mobile" : "l"}
          modColor="yellow"
          modShadow={pressedBtn === "drop" ? modShadow : null}
          mix="control-panel__drop"
          onDown={() => onDown("drop")}
          onUp={() => onUp()}
          isTablet={isTablet}
        />
      </div>
    </div>
  );
}

export default ControlPanel;
