import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import * as _ from "lodash";

import { gridState } from "../../state/grid";
import { placeTotem } from "../../lib/placeTotem";

function Hex({ game, i, x, y }) {
  const inputRef = useRef();
  const [grid, setGrid] = useRecoilState(gridState);
  const curr = grid[i];
  const item = _.find(curr?.objects, { name: "item" });

  const replaceItemAtIndex = (arr, index, newValue) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  };

  const handleClick = () => {
    if (game.isSelectingTotem) {
      placeTotem(i, x, y);
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
        objects: [
          { name: "state", type: null },
          { name: "item", type: "grass", age: 0 },
        ],
      },
    ]);
  }, [i]);

  return (
    <>
      <div
        onClick={handleClick}
        className={`hex  hex--${item?.name}  hex--${item?.type}`}
        ref={inputRef}
        data-x={x}
        data-y={y}
        data-i={i}
      ></div>
    </>
  );
}

export default Hex;
