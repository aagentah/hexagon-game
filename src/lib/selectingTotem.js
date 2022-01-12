import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { gameState } from "../state/game";

export const selectingTotem = async (totem) => {
  const game = _.cloneDeep(getRecoil(gameState));

  game.isSelectingTotem = totem;

  await setRecoil(gameState, game);
};
