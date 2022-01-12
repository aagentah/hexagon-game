import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { playerState } from "../state/player";

export const increaseStats = async (attr) => {
  const player = _.cloneDeep(getRecoil(playerState));

  player.coins--;
  player.stats[attr]++;

  await setRecoil(playerState, player);
};
