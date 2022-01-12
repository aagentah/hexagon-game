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
import { playerAttack } from "../../../lib/playerAttack";

function Object({ hex, object }) {
  const [grid, setGrid] = useRecoilState(gridState);
  const [game, setGame] = useRecoilState(gameState);
  const [player, setPlayer] = useRecoilState(playerState);

  const { i, x, y, inputRef } = hex;
  const { name, type, age } = object;

  // useEffect(() => {
  //   //
  // }, [i]);

  if (name === "player") {
    return <Player hex={hex} object={object} />;
  }

  if (name === "base" && type === "trees") {
    return (
      <img
        className="object"
        src={require("../../../images/trees-1.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />
    );
  }

  if (name === "base" && (type === "grass" || age >= 10)) {
    return (
      <img
        className="object"
        src={require("../../../images/grass-1.png")}
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
        onClick={() => movePlayer(i, x, y)}
      />
    );
  }

  if (name === "state" && type === "killable") {
    return (
      <img
        className="object"
        src={require("../../../images/hex-red.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        onClick={() => playerAttack(i, x, y)}
      />
    );
  }

  return false;
}

export default Object;
