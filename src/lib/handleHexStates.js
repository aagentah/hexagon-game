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
  const playerNeighbours = honeycomb.grid.neighborsOf(
    honeycomb.hex(playerPosHex.x, playerPosHex.y)
  );
  const attackTypes = ["grass", "trees"];
  const moveTypes = ["dirt", "pickup"];

  // Loops through grid and sets state
  for (let i = 0; i < grid.length; i++) {
    const hex = grid[i];
    let item = _.find(hex?.objects, { name: "item" });

    // Increments age of item
    item.age = item.age + 1;

    // Changes dirt to grass after certain age
    if (i !== player.position && item.type === "dirt" && item.age >= 20) {
      _.remove(hex.objects, (e) => e.name === "item");
      hex.objects.push({ name: "item", type: "grass", age: 20 });
    }

    // Changes grass to trees after certain age
    if (i !== player.position && item.type === "grass" && item.age >= 40) {
      _.remove(hex.objects, (e) => e.name === "item");
      hex.objects.push({ name: "item", type: "trees", age: 40 });
    }

    item = _.cloneDeep(_.find(hex?.objects, { name: "item" }));

    // Adds/removes move & attack state if within moveable area
    if (_.find(playerNeighbours, { x: hex.x, y: hex.y })) {
      if (attackTypes.includes(item.type)) {
        hex.objects.push({ name: "state", type: "attack" });
      }

      if (moveTypes.includes(item.type)) {
        hex.objects.push({ name: "state", type: "move" });
      }
    } else {
      _.remove(hex.objects, (e) => e.name === "state");
    }
  }

  // Every 20th round, Add pickup to a random grass block
  if (game.round % 20 === 0 && !game.chestSpawned.includes(game.round)) {
    const allGrass = _.filter(grid, {
      objects: [{ name: "item", type: "grass" }],
    });

    const randGrass = allGrass[_.random(allGrass.length)];

    _.remove(randGrass.objects, (e) => e.name === "item" && e.type === "grass");
    randGrass.objects.push({ name: "item", type: "pickup", age: 0 });

    game.chestSpawned.push(game.round);
  }

  await setRecoil(gameState, game);
  await setRecoil(gridState, grid);
};
