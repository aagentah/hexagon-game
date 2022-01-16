import { useState, useEffect } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import * as _ from "lodash";

import Sprite from "./sprite";

function Player({ hex, object }) {
  const { i, x, y, inputRef } = hex;
  const { type, animations } = object;
  const [offsetTop, setOffsetTop] = useState(inputRef.offsetTop);
  const [offsetLeft, setOffsetLeft] = useState(inputRef.offsetLeft);
  const [sprite, setSprite] = useState("idle");
  const [frames, setFrames] = useState(1);

  // Animates the Player image
  useEffect(() => {
    if (animations.active) {
      setOffsetLeft(animations.offsetLeft);
      setOffsetTop(animations.offsetTop);
      setSprite(`walk-${animations.facing}`);
      setFrames(animations.frames[animations.facing]);
    } else {
      setSprite("idle");
      setFrames(1);
    }
  }, [animations.active, animations.offsetTop, animations.facing]);

  return (
    <>
      <div
        className="object  object--player"
        style={{ top: offsetTop, left: offsetLeft }}
      >
        <Sprite
          image={`/images/wizzard/${sprite}.png`}
          size={32}
          count={4}
          speed={100}
        />
      </div>
    </>
  );
}

export default Player;
