import * as _ from "lodash";

import Player from "./player";
import Pickup from "./pickup";

import { playerMove } from "../../lib/playerMove";
import { playerAttack } from "../../lib/playerAttack";

function Object({ game, hex, caption }) {
  const { i, x, y, inputRef, object, selector, npc } = hex;

  const renderNpc = () => {
    if (npc) {
      return (
        <img
          className="object  object--state"
          src={process.env.PUBLIC_URL + "/images/wizzard/projectile.png"}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
          onClick={() => !game.isAnimating && playerMove(i, x, y)}
        />
      );
    }
  };

  const renderSelector = () => {
    if (selector && selector.type === "move") {
      return (
        <img
          className="object  object--state"
          src={process.env.PUBLIC_URL + "/images/hex-green.png"}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
          onClick={() => !game.isAnimating && playerMove(i, x, y)}
        />
      );
    }

    if (selector && selector.type === "attack") {
      return (
        <img
          className="object  object--state"
          src={process.env.PUBLIC_URL + "/images/hex-red.png"}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
          onClick={() => !game.isAnimating && playerAttack(i, x, y)}
        />
      );
    }
  };

  if (object.type === "totem") {
    return (
      <>
        {renderNpc()}
        {renderSelector()}
        <img
          className="object  object--building"
          src={process.env.PUBLIC_URL + "/images/small-building-1.png"}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />
      </>
    );
  }

  if (object.type === "pickup") {
    return (
      <>
        {renderNpc()}
        {renderSelector()}
        <Pickup hex={hex} object={object} />
      </>
    );
  }

  if (object.type === "peak") {
    return (
      <>
        {renderNpc()}
        {renderSelector()}
        <img
          className="object  object--peak"
          src={process.env.PUBLIC_URL + `/images/${object.asset}.png`}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />
      </>
    );
  }

  if (object.type === "trees") {
    return (
      <>
        {renderNpc()}
        {renderSelector()}
        <img
          className="object  object--trees"
          src={process.env.PUBLIC_URL + "/images/trees-1.png"}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />
      </>
    );
  }

  if (object.type === "grass") {
    return (
      <>
        {renderNpc()}
        {renderSelector()}
        <img
          className="object  object--grass"
          src={process.env.PUBLIC_URL + "/images/grass-1.png"}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />
      </>
    );
  }

  if (object.type === "dirt") {
    return (
      <>
        {renderNpc()}
        {renderSelector()}

        <img
          className="object  object--dirt"
          src={process.env.PUBLIC_URL + "/images/dirt.png"}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />

        {object.age >= game.grassSpawn / 2 && (
          <img
            className="object  object--grass"
            src={process.env.PUBLIC_URL + "/images/grass-1.png"}
            alt="logo"
            style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
          />
        )}
      </>
    );
  }

  if (object.type === "player") {
    return (
      <>
        <img
          className="object  object--dirt"
          src={process.env.PUBLIC_URL + "/images/dirt.png"}
          alt="logo"
          style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
        />
        <Player hex={hex} object={object} caption={caption} />
      </>
    );
  }
}

export default Object;
