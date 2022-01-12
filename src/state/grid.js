import { atom } from "recoil";

export const gridState = atom({
  key: "gridState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
