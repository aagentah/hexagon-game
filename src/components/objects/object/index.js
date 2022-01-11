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

import { gridState } from "../../../state/grid";
import { gameState } from "../../../state/game";
import { playerState } from "../../../state/player";

function Object({ hex, object }) {
  const [grid, setGrid] = useRecoilState(gridState);
  const [game, setGame] = useRecoilState(gameState);
  const [player, setPlayer] = useRecoilState(playerState);

  const { inputRef } = hex;
  const { name } = object;

  // useEffect(() => {
  //   //
  // }, [i]);

  if (name === "player") {
    console.log("player", player);
    return (
      <img
        className="grass grass--2"
        src={require("../../../images/player.gif")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />
    );
  }

  if (name === "tree") {
    return (
      <img
        className="grass grass--2"
        src={require("../../../images/trees-1.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />
    );
  }

  return false;
}

export default Object;
