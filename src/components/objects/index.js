import React, { useRef, useState, useEffect } from "react";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import * as Honeycomb from "honeycomb-grid";
import * as _ from "lodash";

import { gridState } from "../../state/grid";

import Object from "./object";

function Objects({ hex }) {
  // const [game, setGame] = useRecoilState(gridState);

  return (
    <>
      {hex.objects.length &&
        hex.objects.map((object, i) => {
          return <Object key={i} hex={hex} object={object} />;
        })}
    </>
  );
}

export default Objects;
