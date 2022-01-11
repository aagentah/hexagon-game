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

  const currentPos = newPlayer.position;
  const newPos = honeycomb.grid.indexOf(honeycomb.hex([x, y]));
  const playerObj = _.find(newGrid[currentPos].objects, { name: "player" });

  newPlayer.position = newPos;
  _.remove(newGrid[currentPos].objects, (e) => e.name === "player");
  newGrid[newPos].objects.push(playerObj);
  newGame.round = newGame.round + 1;

  await setRecoil(playerState, newPlayer);
  await setRecoil(gridState, newGrid);
  await setRecoil(gameState, newGame);
};
