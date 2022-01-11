import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const gameState = atom({
  key: "gameState", // unique ID (with respect to other atoms/selectors)
  default: {
    round: 0,
  }, // default value (aka initial value)
});
