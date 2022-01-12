import { atom } from "recoil";

export const playerState = atom({
  key: "playerState", // unique ID (with respect to other atoms/selectors)
  default: {
    name: "Fred",
    health: 100,
    canMove: 1,
    position: null,
  }, // default value (aka initial value)
});
