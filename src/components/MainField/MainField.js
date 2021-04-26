import "./MainField.scss";
import Block from "../generic/Block/Block";

function MainField({ field }) {
  return (
    <section className="main-field">
      <ul className="main-field__list">
        {Object.entries(field).map(([k, v]) => (
          <Block key={v.id} state={v.isActive} />
        ))}
      </ul>
    </section>
  );
}

export default MainField;
