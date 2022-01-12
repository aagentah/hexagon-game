import { atom } from "recoil";

export const playerState = atom({
  key: "playerState", // unique ID (with respect to other atoms/selectors)
  default: {
    name: "Fred",
    health: 100,
    canMove: 1,
    position: null,
    coins: 0,
    stats: {
      attack: 1,
      agility: 1,
      conjuration: 1,
    },
    totems: [],
  }, // default value (aka initial value)
});
