import "./ControlPanel.scss";
import Btn from "./Btn/Btn";

function ControlPanel() {
  return (
    <div className="control-panel">
      <div className="control-panel__main">
        <Btn
          type="button"
          ariaLabel=""
          modSize="m"
          modColor="yellow"
          mix="control-panel__left"
        />
        <Btn
          type="button"
          ariaLabel=""
          modSize="m"
          modColor="yellow"
          // modShadow="reverse-m"
          mix="control-panel__up"
        />
        <Btn
          type="button"
          ariaLabel=""
          modSize="m"
          modColor="yellow"
          mix="control-panel__down"
        />
        <Btn
          type="button"
          ariaLabel=""
          modSize="m"
          modColor="yellow"
          mix="control-panel__right"
        />
      </div>
      <div className="control-panel__top">
        <Btn
          type="button"
          ariaLabel="кнопка сбросить"
          modSize="s"
          modColor="red"
          mix="control-panel__small-btn"
        />
        <Btn
          type="button"
          ariaLabel="кнопка звук"
          modSize="s"
          modColor="green"
          // modShadow="reverse-s"
          mix="control-panel__small-btn"
        />
        <Btn
          type="button"
          ariaLabel="кнопка пауза/старт"
          modSize="s"
          modColor="green"
          mix="control-panel__small-btn"
        />
        <Btn
          type="button"
          ariaLabel="кнопка уронить"
          modSize="l"
          modColor="yellow"
          mix="control-panel__drop"
        />
      </div>
    </div>
  );
}

export default ControlPanel;
