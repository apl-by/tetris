import "./Screen.scss";
import PlayArea from "./PlayArea/PlayArea";
import GameStat from "./GameStat/GameStat";

function Screen({ field, statFild }) {
  return (
    <div className="container">
      <h1 className="container__title">Тетрис</h1>
      <div className="screen">
        <PlayArea field={field} />
        <GameStat statFild={statFild} />
      </div>
    </div>
  );
}

export default Screen;
