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
  // const [hasRendered, setHasRendered] = useState(false);
  const [grid, setGrid] = useRecoilState(gridState);
  // const setGrid = useSetRecoilState(gridState);

  // const baseClass = classnames({
  //           "btn": true,
  //            "btn__active": isActive;
  //          )}

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
        base: "grass",
        objects: [],
      },
    ]);
  }, [i]);

  const setObject = () => {
    const newObjects = _.cloneDeep(grid[i].objects);
    newObjects.push({ name: "tree" });

    const newGame = replaceItemAtIndex(grid, i, {
      ...grid[i],
      objects: newObjects,
    });

    setGrid(newGame);
  };

  // const handleBaseClass = () => {
  //   if (grid[i]?.base) {
  //     return
  //     console.log("grid[i].base", grid[i].base);
  //   }
  // };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${grass1})` }}
        className={`hex  base--${grid[i]?.base && grid[i]?.base}`}
        ref={inputRef}
        data-xyi={i}
        onClick={setObject}
      ></div>
    </>
  );
}

export default Hex;
