import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { gameState } from "../state/game";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

import { targetDirection } from "../functions/targetDirection";

const postAnimation = async (i, x, y) => {
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const game = _.cloneDeep(getRecoil(gameState));
  const currentPos = player.position;
  const hexPlayer = grid[currentPos].object;
  const item = grid[i]?.object;

  // Kills grass
  if (item.type === "grass") {
    grid[i].object = { type: "dirt", age: 0 };
  }

  // Kills trees
  if (item.type === "trees") {
    grid[i].object = { type: "grass", age: 20 };
  }

  game.round++;

  // Resets animations in the hexPlayer
  hexPlayer.animations.active = false;
  hexPlayer.animations.offsetLeft = null;
  hexPlayer.animations.offsetTop = null;
  hexPlayer.animations.facing = null;
  game.isAnimating = false;

  await setRecoil(playerState, player);
  await setRecoil(gridState, grid);
  await setRecoil(gameState, game);
};

const animation = async (i, x, y) => {
  const game = _.cloneDeep(getRecoil(gameState));
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const currentPos = player.position;
  const hexPlayer = grid[currentPos].object;

  // Activate animations in the hexPlayer
  hexPlayer.animations.active = true;
  hexPlayer.animations.offsetLeft = grid[currentPos].inputRef.offsetLeft;
  hexPlayer.animations.offsetTop = grid[currentPos].inputRef.offsetTop;
  hexPlayer.animations.facing = targetDirection(i, x, y);
  game.isAnimating = true;

  await setRecoil(playerState, player);
  await setRecoil(gridState, grid);
  await setRecoil(gameState, game);
};

export const playerAttack = async (i, x, y) => {
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));

  const currentPos = player.position;
  const hexPlayer = grid[currentPos].object;

  animation(i, x, y);

  setTimeout(async () => {
    postAnimation(i, x, y);
  }, hexPlayer.animations.time);
};
