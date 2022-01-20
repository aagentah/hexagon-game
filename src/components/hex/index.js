import React, { useRef, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import * as _ from "lodash";

import { gridState } from "../../state/grid";
import { totemPlace } from "../../lib/totemPlace";

function Hex({ game, i, x, y }) {
  const inputRef = useRef();
  const [grid, setGrid] = useRecoilState(gridState);
  const curr = grid[i];
  const [clss, setClss] = useState(false);

  const replaceItemAtIndex = (arr, index, newValue) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  };

  const handleClick = () => {
    if (game.isSelectingTotem) {
      totemPlace(i, x, y);
    }
  };

  useEffect(() => {
    setGrid((old) => [
      ...old,
      {
        i,
        x,
        y,
        inputRef: {
          offsetLeft: inputRef.current.offsetLeft,
          offsetTop: inputRef.current.offsetTop,
          offsetHeight: inputRef.current.offsetHeight,
          offsetWidth: inputRef.current.offsetWidth,
        },
        object: { type: "grass", age: 0 },
        npc: null, // { target: 12 }
        selector: { type: null },
      },
    ]);
  }, [i]);

  useEffect(() => {
    if (curr) {
      setClss(curr.object.type);
    }
  }, [curr]);

  return (
    <>
      <div
        onClick={handleClick}
        className={`hex  hex--${clss}`}
        ref={inputRef}
        data-x={x}
        data-y={y}
        data-i={i}
      >
        <div className="debug"> {i}</div>
      </div>
    </>
  );
}

export default Hex;
