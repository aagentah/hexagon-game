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

import { honeycombState } from "../../../state/honeycomb";

import grass1 from "../../../images/grass-1.png";
import grass2 from "../../../images/grass-2.png";
import trees1 from "../../../images/trees-1.png";

function Grass({ x, y, i, inputRef }) {
  const [honeycomb, setHoneycomb] = useRecoilState(honeycombState);

  const { offsetTop, offsetLeft, offsetHeight } = inputRef?.current;
  const neighboursOf = honeycomb.grid.neighborsOf(honeycomb.hex(5, 5));
  const isNeighbour = _.find(neighboursOf, { x, y });

  if (isNeighbour) {
    return (
      <img
        className="grass grass--2"
        src={grass2}
        alt="logo"
        style={{ top: offsetTop, left: offsetLeft }}
      />
    );
  }

  return false;
}

export default Grass;
