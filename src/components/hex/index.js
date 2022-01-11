import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import * as Honeycomb from "honeycomb-grid";
import * as _ from "lodash";

import { honeycombState } from "../../state/honeycomb";

function Hex({ x, y, i }) {
  const [honeycomb, setHoneycomb] = useRecoilState(honeycombState);

  const neighboursOf = honeycomb.grid.neighborsOf(honeycomb.hex(5, 5));
  const isNeighbour = _.find(neighboursOf, { x, y });

  if (isNeighbour) {
    return <div className="hex red"></div>;
  }

  return <div className="hex"></div>;
}

export default Hex;
