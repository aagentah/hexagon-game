import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const handleHexStates = async () => {
  const honeycomb = getRecoil(honeycombState);
  const player = getRecoil(playerState);
  const grid = _.cloneDeep(getRecoil(gridState));
  const playerPosHex = grid[player.position];
  const movable = honeycomb.grid.neighborsOf(
    honeycomb.hex(playerPosHex.x, playerPosHex.y)
  );

  // Loops through grid and sets state
  for (let i = 0; i < grid.length; i++) {
    const hex = grid[i];
    let base = _.find(hex?.objects, { name: "base" });

    // Increments age of base
    base.age = base.age + 1;

    // Changes dirt to grass after certain age
    if (i !== player.position && base.age >= 20) {
      _.remove(grid[i].objects, (e) => e.name === "base");
      grid[i].objects.push({ name: "base", type: "grass", age: 0 });
      base = _.cloneDeep(_.find(hex?.objects, { name: "base" }));
    }

    // Adds/removes movable & killable state if within moveable area
    if (_.find(movable, { x: hex.x, y: hex.y })) {
      if (base.type === "grass") {
        hex.objects.push({ name: "state", type: "killable" });
      }

      if (base.type === "dirt") {
        hex.objects.push({ name: "state", type: "movable" });
      }
    } else {
      _.remove(hex.objects, (e) => e.name === "state");
    }
  }

  await setRecoil(gridState, grid);
};
