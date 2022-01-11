import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gameState } from "../state/game";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

const postAnimation = async (x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const newGrid = _.cloneDeep(getRecoil(gridState));
  const newPlayer = _.cloneDeep(getRecoil(playerState));
  const newGame = _.cloneDeep(getRecoil(gameState));

  const currentPos = newPlayer.position;
  const newPos = honeycomb.grid.indexOf(honeycomb.hex([x, y]));
  const playerHexObj = _.find(newGrid[currentPos].objects, { name: "player" });

  newPlayer.position = newPos;
  newGrid[newPos].objects.push(playerHexObj);
  _.remove(newGrid[currentPos].objects, (e) => e.name === "player");
  newGame.round = newGame.round + 1;

  playerHexObj.animations.active = false;
  playerHexObj.animations.offsetLeft = null;
  playerHexObj.animations.offsetTop = null;

  await setRecoil(playerState, newPlayer);
  await setRecoil(gridState, newGrid);
  await setRecoil(gameState, newGame);
};

const animation = async (x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const newGrid = _.cloneDeep(getRecoil(gridState));
  const newPlayer = _.cloneDeep(getRecoil(playerState));
  const newGame = _.cloneDeep(getRecoil(gameState));

  const currentPos = newPlayer.position;
  const newPos = honeycomb.grid.indexOf(honeycomb.hex([x, y]));
  const playerHexObj = _.find(newGrid[currentPos].objects, { name: "player" });

  playerHexObj.animations.active = true;
  playerHexObj.animations.offsetLeft = newGrid[newPos].inputRef.offsetLeft;
  playerHexObj.animations.offsetTop = newGrid[newPos].inputRef.offsetTop;

  await setRecoil(playerState, newPlayer);
  await setRecoil(gridState, newGrid);
  await setRecoil(gameState, newGame);
};

export const movePlayer = async (x, y) => {
  const newGrid = _.cloneDeep(getRecoil(gridState));
  const newPlayer = _.cloneDeep(getRecoil(playerState));

  const currentPos = newPlayer.position;
  const playerHexObj = _.find(newGrid[currentPos].objects, { name: "player" });

  animation(x, y);

  setTimeout(async () => {
    postAnimation(x, y);
  }, playerHexObj.animations.time);
};
