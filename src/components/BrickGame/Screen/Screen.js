import "./Screen.scss";
import PlayArea from "./PlayArea/PlayArea";
import GameStat from "./GameStat/GameStat";

function Screen() {
  return (
    <div className="container">
      <h1 className="container__title">Тетрис</h1>
      <div className="screen">
        <PlayArea />
        <GameStat />
      </div>
    </div>
  );
}

export default Screen;
