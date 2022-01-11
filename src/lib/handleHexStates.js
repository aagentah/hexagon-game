import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const handleHexStates = async () => {
  const honeycomb = getRecoil(honeycombState);
  const player = getRecoil(playerState);
  const newGrid = _.cloneDeep(getRecoil(gridState));

  // Loops through grid and sets state
  const playerPosGrid = newGrid[player.position];
  const playerPosHex = honeycomb.hex(playerPosGrid.x, playerPosGrid.y);
  const movable = honeycomb.grid.neighborsOf(playerPosHex);

  for (let i = 0; i < newGrid.length; i++) {
    const hex = newGrid[i];

    // Adds/removes movable state if within moveable area
    if (_.find(movable, { x: hex.x, y: hex.y })) {
      hex.objects.push({ name: "state", type: "movable" });
    } else {
      _.remove(hex.objects, (e) => {
        return e.name === "state";
      });
    }
  }

  await setRecoil(gridState, newGrid);
};
