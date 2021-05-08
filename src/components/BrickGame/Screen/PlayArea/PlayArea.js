import "./PlayArea.scss";
import Block from "../Block/Block";

function PlayArea({ field }) {
  return (
    <div className="play-area">
      <ul className="play-area__list">
        {Object.entries(field).map(([k, v]) => (
          <Block key={v.id} state={v.isActive} match={v.match} />
        ))}
      </ul>
    </div>
  );
}

export default PlayArea;
