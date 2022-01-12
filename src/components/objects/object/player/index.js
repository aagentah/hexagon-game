import React, { useRef, useState, useEffect } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import * as Honeycomb from "honeycomb-grid";
import * as _ from "lodash";

import { movePlayer } from "../../../../lib/movePlayer";

function Player({ hex, object }) {
  const { i, x, y, inputRef } = hex;
  const { name, type, animations } = object;
  const [offsetTop, setOffsetTop] = useState(inputRef.offsetTop);
  const [offsetLeft, setOffsetLeft] = useState(inputRef.offsetLeft);
  const [sprite, setSprite] = useState("idle");
  const [frames, setFrames] = useState(1);

  // Animates the Player image
  useEffect(() => {
    if (!animations.active) return;
    setOffsetLeft(animations.offsetLeft);
    setOffsetTop(animations.offsetTop);
    setSprite(`walk-${animations.facing}`);
    setFrames(animations.frames[animations.facing]);

    console.log("animations.facing", animations.facing);
    console.log(
      "animations.frames[animations.facing]",
      animations.frames[animations.facing]
    );
  }, [animations.active, animations.offsetTop, animations.facing]);

  return (
    <>
      <div
        className="object  object--player"
        style={{ top: offsetTop, left: offsetLeft }}
      >
        <SpriteAnimator
          width={32}
          height={32}
          sprite={require(`../../../../images/wizzard/${sprite}.png`)}
          direction="horizontal"
          shouldAnimate={true}
          fps={8}
          frameCount={frames}
          startFrame={0}
          stopLastFrame={false}
          reset={null}
          wrapAfter={8}
        />
      </div>
    </>
  );
}

export default Player;
