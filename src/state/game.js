import { atom } from "recoil";

export const gameState = atom({
  key: "gameState", // unique ID (with respect to other atoms/selectors)
  default: {
    round: 0,
    chestSpawned: [],
    isAnimating: false,
    isSelectingTotem: null,
    difficulty: 1, // of 100%
    grassSpawn: 15, // default
    treesSpawn: 20, // default
    peakSpawn: 30, // default
  },
});
