import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { gameState } from "../state/game";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const placeTotem = async (i, x, y) => {
  const game = _.cloneDeep(getRecoil(gameState));
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));

  // TODO: add check to make sure not placing totem on player or totem or dirt hex etc
  grid[i].object = { type: `totem`, age: 0 };
  player.totems.push({ i, x, y, style: "" });
  game.isSelectingTotem = null;
  game.round = game.round + 1;

  await setRecoil(playerState, player);
  await setRecoil(gameState, game);
  await setRecoil(gridState, grid);
};
