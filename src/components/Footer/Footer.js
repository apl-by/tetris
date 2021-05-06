import "./Footer.scss";
import { useState, useEffect } from "react";
import ghIcon from "../../images/github_icon.svg";

function Footer() {
  const [year, setYear] = useState(2021);

  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    if (currentYear > 2021) {
      setYear(`2021-${currentYear}`);
    }
  }, []);

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {year} "Проект - тетрис"</p>
      <a
        href="https://github.com/apl-by"
        target="_blank"
        rel="noreferrer"
        className="footer__link"
      >
        <img src={ghIcon} alt="иконка github" className="footer__icon" /> Github
      </a>
    </footer>
  );
}

export default Footer;
