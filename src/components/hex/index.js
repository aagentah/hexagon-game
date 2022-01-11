import React, { useRef, useState, useEffect } from "react";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

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
        state: null, // 'move', 'attack'
        base: "grass",
        objects: [{ name: "state", type: null }],
      },
    ]);
  }, [i]);

  // const setObject = () => {
  //   const newObjects = _.cloneDeep(curr.objects);
  //   newObjects.push({ name: "tree" });
  //
  //   const newGame = replaceItemAtIndex(grid, i, {
  //     ...curr,
  //     objects: newObjects,
  //   });
  //
  //   setGrid(newGame);
  // };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${grass1})` }}
        className={`hex  base--${curr?.base}`}
        ref={inputRef}
        data-x={x}
        data-y={y}
        data-i={i}
        // onClick={setObject}
      ></div>
    </>
  );
}

export default Hex;
