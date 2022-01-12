import { useState, useEffect } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import * as _ from "lodash";

import { movePlayer } from "../../../../lib/movePlayer";

function Pickup({ hex, object }) {
  const { i, x, y, inputRef } = hex;
  const { name, type, animations } = object;
  const [offsetTop, setOffsetTop] = useState(inputRef.offsetTop);
  const [offsetLeft, setOffsetLeft] = useState(inputRef.offsetLeft);

  return (
    <>
      <img
        className="object  object--dirt"
        src={require("../../../../images/dirt.png")}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />

      <div
        className="object  object--pickup"
        style={{ top: offsetTop, left: offsetLeft }}
      >
        <SpriteAnimator
          width={32}
          height={32}
          sprite={require(`../../../../images/bonfire.png`)}
          direction="horizontal"
          shouldAnimate={true}
          fps={8}
          frameCount={4}
          startFrame={0}
          stopLastFrame={false}
          reset={null}
          wrapAfter={8}
        />
      </div>
    </>
  );
}

export default Pickup;
