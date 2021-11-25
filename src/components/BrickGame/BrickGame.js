import "./BrickGame.scss";
import Screen from "./Screen/Screen";
import ControlPanel from "./ControlPanel/ControlPanel";
import Link from "../generic/Link/Link";
import ghIcon from "../../images/github_icon.svg";
import { GH_LINK } from "../../utils/config";

function BrickGame({ isTablet, ...props }) {
  return (
    <section className="brick-game">
      {isTablet && (
        <Link
          link={GH_LINK}
          icon={ghIcon}
          iconAlt="иконка github"
          mix="brick-game__link"
        />
      )}
      <Screen />
      <ControlPanel {...props} isTablet={isTablet} />
    </section>
  );
}

export default BrickGame;
