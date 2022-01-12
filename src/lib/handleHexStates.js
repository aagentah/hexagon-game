import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gameState } from "../state/game";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";

export const handleHexStates = async () => {
  const honeycomb = getRecoil(honeycombState);
  const game = _.cloneDeep(getRecoil(gameState));
  const player = getRecoil(playerState);
  const grid = _.cloneDeep(getRecoil(gridState));
  const playerPosHex = grid[player.position];
  const move = honeycomb.grid.neighborsOf(
    honeycomb.hex(playerPosHex.x, playerPosHex.y)
  );

  // Loops through grid and sets state
  for (let i = 0; i < grid.length; i++) {
    const hex = grid[i];
    let base = _.find(hex?.objects, { name: "base" });

    // Increments age of base
    base.age = base.age + 1;

    // Changes dirt to grass after certain age
    if (i !== player.position && base.type === "dirt" && base.age >= 20) {
      _.remove(grid[i].objects, (e) => e.name === "base");
      grid[i].objects.push({ name: "base", type: "grass", age: 20 });
    }

    // Changes grass to trees after certain age
    if (i !== player.position && base.type === "grass" && base.age >= 40) {
      _.remove(grid[i].objects, (e) => e.name === "base");
      grid[i].objects.push({ name: "base", type: "trees", age: 40 });
    }

    base = _.cloneDeep(_.find(hex?.objects, { name: "base" }));

    // Adds/removes move & attack state if within moveable area
    if (_.find(move, { x: hex.x, y: hex.y })) {
      if (base.type === "small-building-1") {
        hex.objects.push({ name: "state", type: "attack" });
      }

      if (base.type === "trees") {
        hex.objects.push({ name: "state", type: "attack" });
      }

      if (base.type === "pickup") {
        hex.objects.push({ name: "state", type: "move" });
      }

      if (base.type === "grass") {
        hex.objects.push({ name: "state", type: "attack" });
      }

      if (base.type === "dirt") {
        hex.objects.push({ name: "state", type: "move" });
      }
    } else {
      _.remove(hex.objects, (e) => e.name === "state");
    }
  }

  // Every 20th round, Add pickup to a random grass block
  if (game.round % 20 === 0 && !game.chestSpawned.includes(game.round)) {
    const allGrass = _.filter(grid, {
      objects: [{ name: "base", type: "grass" }],
    });

    const randGrass = allGrass[_.random(allGrass.length)];

    _.remove(randGrass.objects, (e) => e.name === "base" && e.type === "grass");
    randGrass.objects.push({ name: "base", type: "pickup", age: 0 });

    game.chestSpawned.push(game.round);
  }

  await setRecoil(gameState, game);
  await setRecoil(gridState, grid);
};
