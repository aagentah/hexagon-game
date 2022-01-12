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
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });
  const hexPickup = _.find(grid[i].objects, { type: "pickup" });

  // Handle pickup
  if (hexPickup) {
    //
  }

  // Asigns new player position
  _.remove(grid[i].objects, (e) => e.name === "item");
  grid[i].objects.push({ name: "item", type: "dirt", age: 0 });
  player.position = i;
  grid[i].objects.push(hexPlayer);
  _.remove(grid[currentPos].objects, (e) => e.name === "player");
  game.round = game.round + 1;

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
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });

  // Activate animations in the hexPlayer
  hexPlayer.animations.active = true;
  hexPlayer.animations.offsetLeft = grid[i].inputRef.offsetLeft;
  hexPlayer.animations.offsetTop = grid[i].inputRef.offsetTop;
  hexPlayer.animations.facing = targetDirection(i, x, y);
  game.isAnimating = true;

  await setRecoil(playerState, player);
  await setRecoil(gridState, grid);
  await setRecoil(gameState, game);
};

export const movePlayer = async (i, x, y) => {
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));

  const currentPos = player.position;
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });

  animation(i, x, y);

  setTimeout(async () => {
    postAnimation(i, x, y);
  }, hexPlayer.animations.time);
};
