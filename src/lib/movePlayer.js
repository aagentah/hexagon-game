import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gameState } from "../state/game";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

const postAnimation = async (x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const game = _.cloneDeep(getRecoil(gameState));
  const currentPos = player.position;
  const newPos = honeycomb.grid.indexOf(honeycomb.hex([x, y]));
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });

  // Asigns new player position
  player.position = newPos;
  grid[newPos].objects.push(hexPlayer);
  _.remove(grid[currentPos].objects, (e) => e.name === "player");
  game.round = game.round + 1;

  // Resets animations in the hexPlayer
  hexPlayer.animations.active = false;
  hexPlayer.animations.offsetLeft = null;
  hexPlayer.animations.offsetTop = null;

  await setRecoil(playerState, player);
  await setRecoil(gridState, grid);
  await setRecoil(gameState, game);
};

const animation = async (x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const currentPos = player.position;
  const newPos = honeycomb.grid.indexOf(honeycomb.hex([x, y]));
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });

  // Activate animations in the hexPlayer
  hexPlayer.animations.active = true;
  hexPlayer.animations.offsetLeft = grid[newPos].inputRef.offsetLeft;
  hexPlayer.animations.offsetTop = grid[newPos].inputRef.offsetTop;

  await setRecoil(playerState, player);
  await setRecoil(gridState, grid);
};

export const movePlayer = async (x, y) => {
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));

  const currentPos = player.position;
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });

  animation(x, y);

  setTimeout(async () => {
    postAnimation(x, y);
  }, hexPlayer.animations.time);
};
