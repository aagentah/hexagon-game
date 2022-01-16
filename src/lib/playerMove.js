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
  const hexPickup = grid[i].object.type === "pickup";

  // Handle pickup
  if (hexPickup) {
    player.coins++;
  }

  // Asigns new player position
  grid[i].object = { type: "dirt", age: 0 };
  grid[currentPos].object = { type: "dirt", age: 0 };
  player.position = i;
  grid[i].object = hexPlayer;
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
  hexPlayer.animations.offsetLeft = grid[i].inputRef.offsetLeft;
  hexPlayer.animations.offsetTop = grid[i].inputRef.offsetTop;
  hexPlayer.animations.facing = targetDirection(i, x, y);
  game.isAnimating = true;

  console.log("2");

  await setRecoil(playerState, player);
  await setRecoil(gridState, grid);
  await setRecoil(gameState, game);
};

export const playerMove = async (i, x, y) => {
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));

  const currentPos = player.position;
  const hexPlayer = grid[currentPos].object;

  animation(i, x, y);

  setTimeout(async () => {
    postAnimation(i, x, y);
  }, hexPlayer.animations.time);
};
