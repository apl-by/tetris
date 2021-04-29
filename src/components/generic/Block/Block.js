import "./Block.scss";
import cn from "classnames";
import { memo } from "react";

function Block({ state }) {
  const cnBlock = cn("block", { block_active: state });
  return <li className={cnBlock}></li>;
}

export default memo(Block);
