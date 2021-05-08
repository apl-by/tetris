import "./Block.scss";
import cn from "classnames";
import { memo } from "react";

function Block({ state, match }) {
  const cnBlock = cn("block", {
    block_active: state && !match,
    block_matched: match,
  });
  return <li className={cnBlock}></li>;
}

export default memo(Block);
