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

import { gameState } from "../../../state/game";

import trees1 from "../../../images/trees-1.png";

function Object({ hex, object }) {
  const [game, setGame] = useRecoilState(gameState);
  const { inputRef } = hex;
  const { name } = object;

  if (name === "b") {
    console.log("hex", hex);
    console.log("object", object);
    return (
      <img
        className="grass grass--2"
        src={trees1}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />
    );
  }

  return false;
}

export default Object;
