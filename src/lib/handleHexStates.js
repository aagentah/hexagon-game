import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { honeycombState } from "../state/honeycomb";
import { gameState } from "../state/game";
import { gridState } from "../state/grid";
import { playerState } from "../state/player";
import { setCaption } from "../lib/setCaption";

const handleNpc = ({ honeycomb, game, player, grid }) => {
  // Spawn npc
  if (
    _.find(grid, { object: { type: "totem" } }) &&
    !_.find(grid, { npc: { hasSpawned: true } })
  ) {
    const allGrass = _.filter(grid, { object: { type: "grass" } });
    const allTrees = _.filter(grid, { object: { type: "trees" } });
    const combined = [...allGrass, ...allTrees];
    const rand = combined[_.random(combined.length)];

    rand.npc = { hasSpawned: true, target: null };
  }

  const npcHex = _.find(grid, { npc: { hasSpawned: true } });
  // Move npc
  if (npcHex) {
    const totem = _.find(grid, { object: { type: "totem" } });
    const totemNeighbours = honeycomb.grid.neighborsOf(
      honeycomb.hex(totem.x, totem.y)
    );

    if (!npcHex.npc.target) {
      npcHex.npc.target = totem.i;
    }

    if (_.find(totemNeighbours, { x: npcHex.x, y: npcHex.y })) {
      // If NPC is neighbour of totem, attack
    } else {
      // Otherwise move towards totem
      const route = honeycomb.grid.hexesBetween(
        honeycomb.hex(npcHex.x, npcHex.y),
        honeycomb.hex(totem.x, totem.y)
      );

      const nextInRouteHex = _.find(grid, {
        x: route[1].x,
        y: route[1].y,
      });

      nextInRouteHex.npc = npcHex.npc;
      npcHex.npc = null;
    }
  }

  return grid;
};

const handlePickup = ({ honeycomb, game, player, grid }) => {
  if (game.round === 0) setCaption({ type: "pickup" });

  // Every 20th round, Add pickup to a random grass block
  if (game.round % 20 === 0 && !game.chestSpawned.includes(game.round)) {
    const allGrass = _.filter(grid, { object: { type: "grass" } });
    const allTrees = _.filter(grid, { object: { type: "trees" } });
    const combined = [...allGrass, ...allTrees];
    const rand = combined[_.random(combined.length)];

    rand.object = { type: "pickup", age: 0 };
    game.chestSpawned.push(game.round);
  }

  return grid;
};

export const handleHexStates = async () => {
  const honeycomb = getRecoil(honeycombState);
  const game = _.cloneDeep(getRecoil(gameState));
  const player = getRecoil(playerState);
  let grid = _.cloneDeep(getRecoil(gridState));
  const playerPosHex = grid[player.position];
  const playerNeighbours = honeycomb.grid.neighborsOf(
    honeycomb.hex(playerPosHex.x, playerPosHex.y)
  );
  const attackTypes = ["grass", "trees", "peak"];
  const moveTypes = ["dirt", "pickup", "totem"];

  // Loops through grid and sets state
  for (let i = 0; i < grid.length; i++) {
    const hex = grid[i];
    let item = hex?.object;

    if (!item) {
      break;
    }

    // Increments age of item
    item.age++;

    item = _.cloneDeep(hex?.object);

    // Changes dirt to grass after certain age
    if (
      i !== player.position &&
      item.type === "dirt" &&
      item.age >= game.grassSpawn
    ) {
      hex.object = { type: "grass", age: 0 };
    }

    item = _.cloneDeep(hex?.object);

    // Changes grass to trees after certain age
    if (
      i !== player.position &&
      item.type === "grass" &&
      item.age >=
        _.random(
          game.treesSpawn,
          game.treesSpawn * 100 - game.chestSpawned.length
        )
    ) {
      setCaption({ type: "trees" });
      hex.object = { type: "trees", age: 0 };
    }

    item = _.cloneDeep(hex?.object);

    // Changes grass to peak after certain age
    if (
      i !== player.position &&
      item.type === "trees" &&
      item.age >=
        _.random(
          game.peakSpawn,
          game.peakSpawn * 100 - game.chestSpawned.length
        )
    ) {
      setCaption({ type: "peak" });
      hex.object = {
        type: "peak",
        age: 0,
        asset: _.sample(["peak-1", "peak-2"]),
      };
    }

    item = _.cloneDeep(hex?.object);

    // Get totems
    if (
      i !== player.position &&
      hex.object.type !== "totem" &&
      player.totems.length
    ) {
      for (let i = 0; i < player.totems.length; i++) {
        let totem = player.totems[i];

        // TODO: if totem.style === 'spread'
        const totemNeighbours = honeycomb.grid.neighborsOf(
          honeycomb.hex(totem.x, totem.y)
        );

        // If current hex is totem neighbour, make dirt
        if (_.find(totemNeighbours, { x: hex.x, y: hex.y })) {
          hex.object = { type: "dirt", age: 0 };
        }
      }
    }

    item = _.cloneDeep(hex?.object);

    // If current hex within playerNeighbours, Adds/removes move & attack state if within moveable area
    if (_.find(playerNeighbours, { x: hex.x, y: hex.y })) {
      if (attackTypes.includes(item.type)) {
        hex.selector = { type: "attack" };
      }

      if (moveTypes.includes(item.type)) {
        hex.selector = { type: "move" };
      }
    } else {
      hex.selector = null;
    }
  }

  grid = handleNpc({ honeycomb, game, player, grid });
  grid = handlePickup({ honeycomb, game, player, grid });

  await setRecoil(gameState, game);
  await setRecoil(gridState, grid);
};
