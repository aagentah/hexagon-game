import React, { useRef, useState, useEffect } from "react";
import * as Honeycomb from "honeycomb-grid";
import * as _ from "lodash";

import Player from "./player";
import { movePlayer } from "../../../lib/movePlayer";
import { playerAttack } from "../../../lib/playerAttack";

function Object({ hex, object }) {
  const { i, x, y, inputRef } = hex;
  const { name, type, age } = object;

  if (name === "player") {
    return <Player hex={hex} object={object} />;
  }

  if (name === "base" && type === "small-building-1") {
    return (
      <img
        className="object"
        src={require("../../../images/small-building-1.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />
    );
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
