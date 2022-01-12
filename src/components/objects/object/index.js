import * as _ from "lodash";

import Player from "./player";
import Pickup from "./pickup";

import { movePlayer } from "../../../lib/movePlayer";
import { playerAttack } from "../../../lib/playerAttack";

function Object({ game, hex }) {
  const { i, x, y, inputRef, object, selector } = hex;
  const { type, age } = object;

  const renderSelector = () => {
    if (selector && selector.type === "move") {
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

    if (selector && selector.type === "attack") {
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
  };

  if (type === "player") {
    return (
      <>
        <img
          className="object  object--dirt"
          src={require("../../../images/dirt.png")}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />
        <Player hex={hex} object={object} />
      </>
    );
  }

  if (type === "totem") {
    return (
      <>
        {renderSelector()}
        <img
          className="object  object--building"
          src={require("../../../images/small-building-1.png")}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />
      </>
    );
  }

  if (type === "pickup") {
    return (
      <>
        {renderSelector()}
        <Pickup hex={hex} object={object} />
      </>
    );
  }

  if (type === "trees") {
    return (
      <>
        {renderSelector()}
        <img
          className="object  object--trees"
          src={require("../../../images/trees-1.png")}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />
      </>
    );
  }

  if (type === "grass") {
    return (
      <>
        {renderSelector()}
        <img
          className="object  object--grass"
          src={require("../../../images/grass-1.png")}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />
      </>
    );
  }

  if (type === "dirt") {
    return (
      <>
        {renderSelector()}

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
}

export default Object;
