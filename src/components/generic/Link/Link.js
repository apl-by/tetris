import "./Link.scss";
import cn from "classnames";

function Link({ link, iconAlt, icon, mix }) {
  const cnLink = cn("link", { [`${mix}`]: mix });

  return (
    <a href={link} target="_blank" rel="noreferrer" className={cnLink}>
      <img src={icon} alt={iconAlt} className="link__icon" /> Github
    </a>
  );
}

export default Link;
