import React, { useRef, useState, useEffect } from "react";
import * as Honeycomb from "honeycomb-grid";
import * as _ from "lodash";

import { gridState } from "../../state/grid";

import Object from "./object";

function Objects({ game, hex }) {
  return (
    <>
      {hex.objects.length &&
        hex.objects.map((object, i) => {
          return <Object key={i} game={game} hex={hex} object={object} />;
        })}
    </>
  );
}

export default Objects;
