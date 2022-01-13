import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gameState } from "../state/game";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const totemPlace = async (i, x, y) => {
  const honeycomb = getRecoil(honeycombState);
  const game = _.cloneDeep(getRecoil(gameState));
  const grid = _.cloneDeep(getRecoil(gridState));
  const player = _.cloneDeep(getRecoil(playerState));
  const hex = grid[i];

  if (i === player.position || hex.object.type === "totem") {
    return;
  }

  grid[i].object = { type: `totem`, age: 0 };
  player.totems.push({ i, x, y, style: "" });
  game.isSelectingTotem = null;
  game.round++;

  await setRecoil(playerState, player);
  await setRecoil(gameState, game);
  await setRecoil(gridState, grid);
};
