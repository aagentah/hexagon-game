import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const handleHexAge = async () => {
  const player = getRecoil(playerState);
  const grid = _.cloneDeep(getRecoil(gridState));

  // Loops through grid and sets state
  for (let i = 0; i < grid.length; i++) {
    const hex = grid[i];
    const base = _.find(hex?.objects, { name: "base" });

    if (i === 67) {
      console.log("base.age", base.age);
    }

    // Increments age of base
    base.age = base.age + 1;

    if (i === 67) {
      console.log("base.age (inc)", base.age);
    }

    // Changes dirt to grass after certain age
    // if (i !== player.position && base.age >= 20) {
    //   _.remove(grid[i].objects, (e) => e.name === "base");
    //   grid[i].objects.push({ name: "base", type: "grass", age: 0 });
    // }
  }

  await setRecoil(gridState, grid);
};
