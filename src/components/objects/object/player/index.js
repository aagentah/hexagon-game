import React, { useRef, useState, useEffect } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import * as Honeycomb from "honeycomb-grid";
import * as _ from "lodash";

import { movePlayer } from "../../../../lib/movePlayer";

import sprite from "../../../../images/wizzard/sprite.png";

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
    <>
      <div
        className="object  object--player"
        style={{ top: offsetTop, left: offsetLeft }}
      >
        <SpriteAnimator
          width={32}
          height={36}
          frameCount={8}
          sprite={sprite}
          direction="horizontal"
          shouldAnimate={true}
          fps={8}
          startFrame={0}
          stopLastFrame={false}
          reset={null}
        />
      </div>
    </>
  );
}

export default Player;
