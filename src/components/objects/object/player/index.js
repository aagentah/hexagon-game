import React, { useRef, useState, useEffect } from "react";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import * as Honeycomb from "honeycomb-grid";
import * as _ from "lodash";

import { gridState } from "../../../../state/grid";
import { gameState } from "../../../../state/game";
import { playerState } from "../../../../state/player";

import { movePlayer } from "../../../../lib/movePlayer";

function Player({ hex, object }) {
  const { i, x, y, inputRef } = hex;
  const { name, type, animations } = object;
  const [offsetTop, setOffsetTop] = useState(inputRef.offsetTop);
  const [offsetLeft, setOffsetLeft] = useState(inputRef.offsetLeft);

  // Animates the Player image
  useEffect(() => {
    if (!animations.active) return;
    setOffsetLeft(animations.offsetLeft);
    setOffsetTop(animations.offsetTop);
  }, [animations.active]);

  return (
    <img
      className="object  object--player"
      src={require("../../../../images/player.gif")}
      alt="logo"
      style={{ top: offsetTop, left: offsetLeft }}
    />
  );
}

export default Player;
