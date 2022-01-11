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

import Player from "./player";

import { gridState } from "../../../state/grid";
import { gameState } from "../../../state/game";
import { playerState } from "../../../state/player";

import { movePlayer } from "../../../lib/movePlayer";

function Object({ hex, object }) {
  const [grid, setGrid] = useRecoilState(gridState);
  const [game, setGame] = useRecoilState(gameState);
  const [player, setPlayer] = useRecoilState(playerState);

  const { i, x, y, inputRef } = hex;
  const { name, type } = object;

  // useEffect(() => {
  //   //
  // }, [i]);

  if (name === "player") {
    return <Player hex={hex} object={object} />;
  }

  if (name === "tree") {
    return (
      <img
        className="object"
        src={require("../../../images/trees-1.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />
    );
  }

  if (name === "state" && type === "movable") {
    return (
      <img
        className="object"
        src={require("../../../images/hex-green.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        onClick={() => movePlayer(x, y)}
      />
    );
  }

  return false;
}

export default Object;
