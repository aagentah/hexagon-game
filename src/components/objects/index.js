import * as Honeycomb from "honeycomb-grid";
import * as _ from "lodash";

import { gridState } from "../../state/grid";

import Object from "./object";

function Objects({ game, hex }) {
  return (
    <>
      <Object game={game} hex={hex} />;
    </>
  );
}

export default Objects;
