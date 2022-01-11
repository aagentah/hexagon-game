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

import { gridState } from "../../../state/grid";

import trees1 from "../../../images/trees-1.png";

function Object({ hex, object }) {
  const { inputRef } = hex;
  const { name } = object;

  if (name === "tree") {
    return (
      <img
        className="grass grass--2"
        src={trees1}
        alt="logo"
        style={{ top: inputRef.offsetTop, left: inputRef.offsetLeft }}
      />
    );
  }

  return false;
}

export default Object;
