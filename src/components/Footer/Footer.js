import "./Footer.scss";
import Link from "../generic/Link/Link";
import { useState, useEffect } from "react";
import ghIcon from "../../images/github_icon.svg";
import { GH_LINK } from "../../utils/config";

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
      <Link link={GH_LINK} icon={ghIcon} iconAlt="иконка github" />
    </footer>
  );
}

export default Footer;
