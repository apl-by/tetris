import "./Title.scss";
import cn from "classnames";

function Title({ text, mix }) {
  const cnTitle = cn("title", { [`${mix}`]: mix });

  return <p className={cnTitle}>{text}</p>;
}

export default Title;
