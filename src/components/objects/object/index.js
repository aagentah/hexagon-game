import * as _ from "lodash";

import Player from "./player";
import Pickup from "./pickup";

import { movePlayer } from "../../../lib/movePlayer";
import { playerAttack } from "../../../lib/playerAttack";

function Object({ game, hex, object }) {
  const { i, x, y, inputRef } = hex;
  const { name, type, age } = object;

  if (name === "player") {
    return <Player hex={hex} object={object} />;
  }

  if (type === "totem") {
    return (
      <img
        className="object  object--building"
        src={require("../../../images/small-building-1.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />
    );
  }

  if (type === "pickup") {
    return <Pickup hex={hex} object={object} />;
  }

  if (type === "trees") {
    return (
      <img
        className="object  object--trees"
        src={require("../../../images/trees-1.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />
    );
  }

  if (type === "grass") {
    return (
      <img
        className="object  object--grass"
        src={require("../../../images/grass-1.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />
    );
  }

  if (type === "dirt") {
    return (
      <>
        <img
          className="object  object--dirt"
          src={require("../../../images/dirt.png")}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />

        {age >= 10 && (
          <img
            className="object  object--grass"
            src={require("../../../images/grass-1.png")}
            alt="logo"
            style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
          />
        )}
      </>
    );
  }

  if (name === "state" && type === "move") {
    return (
      <img
        className="object  object--state"
        src={require("../../../images/hex-green.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        onClick={() => !game.isAnimating && movePlayer(i, x, y)}
      />
    );
  }

  if (name === "state" && type === "attack") {
    return (
      <img
        className="object  object--state"
        src={require("../../../images/hex-red.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        onClick={() => !game.isAnimating && playerAttack(i, x, y)}
      />
    );
  }

  return false;
}

export default Object;
