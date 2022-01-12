import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gameState } from "../state/game";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

import { targetDirection } from "../functions/targetDirection";

const postAnimation = async (i, x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const game = _.cloneDeep(getRecoil(gameState));
  const currentPos = player.position;
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });
  const base = _.find(grid[i]?.objects, { name: "base" });

  // Kills grass
  if (base.type === "grass") {
    _.remove(grid[i].objects, (e) => e.name === "base");
    grid[i].objects.push({ name: "base", type: "dirt", age: 0 });
  }

  // Kills trees
  if (base.type === "trees") {
    _.remove(grid[i].objects, (e) => e.name === "base");
    grid[i].objects.push({ name: "base", type: "grass", age: 20 });
  }

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
  const honeycomb = getRecoil(honeycombState);
  const game = _.cloneDeep(getRecoil(gameState));
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const currentPos = player.position;
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });

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
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });

  animation(i, x, y);

  setTimeout(async () => {
    postAnimation(i, x, y);
  }, hexPlayer.animations.time);
};
