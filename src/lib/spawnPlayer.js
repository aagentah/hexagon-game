import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const spawnPlayer = async () => {
  const newGrid = _.cloneDeep(getRecoil(gridState));
  const newPlayer = _.cloneDeep(getRecoil(playerState));

  // Spawn player on random center hex

  const centerHexes = [52, 66, 67, 68];
  const spawnPoint = centerHexes[_.random(3)];

  newPlayer.position = spawnPoint;

  newGrid[spawnPoint].objects.push({
    name: "player",
    animations: {
      active: false,
      time: "300",
      offsetLeft: null,
      offsetTop: null,
    },
  });

  await setRecoil(playerState, newPlayer);
  await setRecoil(gridState, newGrid);
};
