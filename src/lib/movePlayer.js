import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gameState } from "../state/game";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

const postAnimation = async (i, x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const game = _.cloneDeep(getRecoil(gameState));
  const currentPos = player.position;
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });
  const hexBase = _.find(grid[currentPos].objects, { name: "base" });

  // Asigns new player position
  _.remove(grid[i].objects, (e) => e.name === "base");
  grid[i].objects.push({ name: "base", type: "dirt", age: 0 });
  player.position = i;
  grid[i].objects.push(hexPlayer);
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

const animation = async (i, x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const currentPos = player.position;
  const hexPlayer = _.find(grid[currentPos].objects, { name: "player" });

  // Activate animations in the hexPlayer
  hexPlayer.animations.active = true;
  hexPlayer.animations.offsetLeft = grid[i].inputRef.offsetLeft;
  hexPlayer.animations.offsetTop = grid[i].inputRef.offsetTop;
  hexPlayer.animations.facing = targetDirection(i, x, y);

  await setRecoil(playerState, player);
  await setRecoil(gridState, grid);
};

const targetDirection = (i, x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const playerPosHex = grid[player.position];

  let compass = ["N", "NE", "SE", "S", "SW", "NW"];
  let neighbour, facing;

  for (let i = 0; i < compass.length; i++) {
    neighbour = honeycomb.grid.neighborsOf(
      honeycomb.hex([playerPosHex.x, playerPosHex.y]),
      compass[i]
    );

    if (neighbour[0].x === x && neighbour[0].y === y) {
      facing = compass[i];
      break;
    }
  }

  return facing;
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
