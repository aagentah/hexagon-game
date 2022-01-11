import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const spawnPlayer = () => {
  const newGrid = _.cloneDeep(getRecoil(gridState));
  const newPlayer = _.cloneDeep(getRecoil(playerState));

  // Select random center spawn point
  const centerHexes = [52, 66, 67, 68];
  const spawnPoint = centerHexes[_.random(3)];

  newPlayer.position = spawnPoint;

  newGrid[spawnPoint].objects.push({
    name: "player",
  });

  setRecoil(playerState, newPlayer);
  setRecoil(gridState, newGrid);

  return spawnPoint;
};
