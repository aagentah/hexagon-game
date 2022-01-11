import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gameState } from "../state/game";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const movePlayer = async (x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const newGrid = _.cloneDeep(getRecoil(gridState));
  const newPlayer = _.cloneDeep(getRecoil(playerState));
  const newGame = _.cloneDeep(getRecoil(gameState));

  const currentPosition = newPlayer.position;
  const newPosition = honeycomb.grid.indexOf(honeycomb.hex([x, y]));
  const playerObj = _.find(newGrid[currentPosition].objects, {
    name: "player",
  });

  newPlayer.position = newPosition;

  _.remove(newGrid[currentPosition].objects, (e) => {
    return e.name === "player";
  });

  newGrid[newPosition].objects.push(playerObj);

  newGame.round = newGame.round + 1;

  // const centerHexes = [52, 66, 67, 68];
  // const spawnPoint = centerHexes[_.random(3)];
  //
  // newPlayer.position = spawnPoint;
  // newGrid[spawnPoint].objects.push({ name: "player" });

  await setRecoil(playerState, newPlayer);
  await setRecoil(gridState, newGrid);
  await setRecoil(gameState, newGame);
};
