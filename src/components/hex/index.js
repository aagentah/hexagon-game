import React, { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import classNames from "classnames";
import * as Honeycomb from "honeycomb-grid";
import * as _ from "lodash";

import { gridState } from "../../state/grid";

import grass1 from "../../images/grass-1.png";
import grass2 from "../../images/grass-2.png";
import trees1 from "../../images/trees-1.png";

function Hex({ x, y, i }) {
  const inputRef = useRef();
  const [grid, setGrid] = useRecoilState(gridState);
  const curr = grid[i];

  function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  useEffect(() => {
    console.log("inputRef.current.offsetWidth", inputRef.current.offsetWidth);
    const w2 = inputRef.current.offsetWidth / 2;
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
          { name: "base", type: "grass", age: 0 },
        ],
      },
    ]);
  }, [i]);

  const base = _.find(curr?.objects, { name: "base" });

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
