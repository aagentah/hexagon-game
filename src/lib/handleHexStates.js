import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const handleHexStates = async () => {
  const honeycomb = getRecoil(honeycombState);
  const player = getRecoil(playerState);
  const grid = _.cloneDeep(getRecoil(gridState));
  const playerPosHex = grid[player.position];
  const movable = honeycomb.grid.neighborsOf(
    honeycomb.hex(playerPosHex.x, playerPosHex.y)
  );

  // Loops through grid and sets state
  for (let i = 0; i < grid.length; i++) {
    const hex = grid[i];

    // Adds/removes movable state if within moveable area
    if (_.find(movable, { x: hex.x, y: hex.y })) {
      hex.objects.push({ name: "state", type: "movable" });
    } else {
      _.remove(hex.objects, (e) => e.name === "state");
    }
  }

  await setRecoil(gridState, grid);
};
