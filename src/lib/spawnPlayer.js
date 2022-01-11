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
  grid[spawnPoint].objects.push({ name: "base", type: "dirt", age: 0 });

  grid[spawnPoint].objects.push({
    name: "player",
    animations: {
      active: false,
      time: "300",
      offsetLeft: null,
      offsetTop: null,
    },
  });

  await setRecoil(playerState, player);
  await setRecoil(gridState, grid);
};
