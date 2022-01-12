import * as _ from "lodash";
import { getRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const targetDirection = (i, x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const playerPosHex = grid[player.position];

  let compass = ["N", "NE", "SE", "S", "SW", "NW"];
  let neighbour, facing;

  for (let i = 0; i < compass.length; i++) {
    neighbour = honeycomb.grid.neighborsOf(
      honeycomb.hex([playerPosHex.x, playerPosHex.y]),
      compass[i]
    );

    if (neighbour[0].x === x && neighbour[0].y === y) {
      facing = compass[i];
      break;
    }
  }

  return facing;
};
