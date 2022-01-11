import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import * as Honeycomb from "honeycomb-grid";

const hexGrid = () => {
  const Grid = Honeycomb.defineGrid();
  const Hex = Honeycomb.extendHex({ orientation: "flat" });

  return {
    grid: Grid.rectangle({ width: 15, height: 8 }),
    hex: Hex,
  };
};

export const honeycombState = atom({
  key: "honeycombState", // unique ID (with respect to other atoms/selectors)
  default: hexGrid(), // default value (aka initial value)
});
