import React, { useRef, useState, useEffect } from "react";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import * as Honeycomb from "honeycomb-grid";
import * as _ from "lodash";

import { gameState } from "../../state/game";

import Grass from "./grass";

import grass1 from "../../images/grass-1.png";
import grass2 from "../../images/grass-2.png";
import trees1 from "../../images/trees-1.png";

function Hex({ x, y, i }) {
  const inputRef = useRef();
  // const [hasRendered, setHasRendered] = useState(false);
  const [game, setGame] = useRecoilState(gameState);
  // const setGame = useSetRecoilState(gameState);

  function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  useEffect(() => {
    console.log("inputRef", inputRef);
    setGame((old) => [
      ...old,
      {
        i,
        x,
        y,
        inputRef: {
          offsetLeft: inputRef.current.offsetLeft,
          offsetTop: inputRef.current.offsetTop,
        },
        objects: [{ name: "a" }],
      },
    ]);
  }, [i]);

  const setObject = () => {
    const newObjects = _.cloneDeep(game[i].objects);
    newObjects.push({ name: "b" });

    const newGame = replaceItemAtIndex(game, i, {
      ...game[i],
      objects: newObjects,
    });

    setGame(newGame);
  };

  return (
    <>
      <div
        className="hex"
        ref={inputRef}
        data-xyi={i}
        onClick={setObject}
      ></div>
    </>
  );
}

export default Hex;
