import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const spawnPlayer = async () => {
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const centerHexes = [52, 66, 67, 68];
  const spawnPoint = centerHexes[_.random(3)];

  // Spawn player on random center hex

  player.position = spawnPoint;
  // grid[spawnPoint].object = { name: "item", type: "dirt", age: 0 };

  grid[spawnPoint].object = {
    type: "player",
    animations: {
      active: false,
      time: "500",
      offsetLeft: null,
      offsetTop: null,
      facing: null,
      frames: {
        N: 4,
        NE: 4,
        SE: 4,
        S: 4,
        SW: 4,
        NW: 4,
      },
    },
  };

  await setRecoil(playerState, player);
  await setRecoil(gridState, grid);
};
