import React, { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import * as _ from "lodash";

import { gridState } from "../../state/grid";

import grass1 from "../../images/grass-1.png";
import grass2 from "../../images/grass-2.png";
import trees1 from "../../images/trees-1.png";

function Hex({ x, y, i }) {
  const inputRef = useRef();
  const [grid, setGrid] = useRecoilState(gridState);
  const curr = grid[i];
  const base = _.find(curr?.objects, { name: "base" });

  const replaceItemAtIndex = (arr, index, newValue) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  };

  useEffect(() => {
    const rect = inputRef?.current.getBoundingClientRect();

    console.log("rect", rect);
    console.log("inputRef?.current", inputRef?.current.offsetTop);
    console.log("inputRef?.current", inputRef?.current.offsetLeft);
    setGrid((old) => [
      ...old,
      {
        i,
        x,
        y,
        inputRef: {
          offsetLeft: rect.left,
          offsetTop: rect.top,
          offsetHeight: rect.height,
          offsetWidth: rect.width,
        },
        objects: [
          { name: "state", type: null },
          { name: "base", type: "grass", age: 0 },
        ],
      },
    ]);
  }, [i]);

  return (
    <>
      <div
        className={`hex  base--${base?.type && base.type}`}
        ref={inputRef}
        data-x={x}
        data-y={y}
        data-i={i}
      ></div>
    </>
  );
}

export default Hex;
