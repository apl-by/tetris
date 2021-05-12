import "./PlayArea.scss";
import Block from "../Block/Block";
import Title from "../../../generic/Title/Title";

function PlayArea({ field, isPause, isStarted, isEnd }) {
  return (
    <div className="play-area">
      <ul className="play-area__list">
        {Object.entries(field).map(([k, v]) => (
          <Block key={v.id} state={v.isActive} match={v.match} />
        ))}
      </ul>
      {isPause && (
        <div className="play-area__cover">
          {isStarted && <Title text="Пауза" mix="play-area__pause" />}
          {!isStarted && !isEnd && (
            <Title text={`Жми\nстарт`} mix="play-area__start" />
          )}
          {isEnd && <Title text={`Конец\nигры`} mix="play-area__end" />}
        </div>
      )}
    </div>
  );
}

export default PlayArea;
