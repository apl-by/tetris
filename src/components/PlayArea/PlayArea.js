import "./PlayArea.scss";
import Block from "../generic/Block/Block";

function PlayArea({ field }) {
  return (
    <section className="play-area">
      <ul className="play-area__list">
        {Object.entries(field).map(([k, v]) => (
          <Block key={v.id} state={v.isActive} match={v.match} />
        ))}
      </ul>
    </section>
  );
}

export default PlayArea;
