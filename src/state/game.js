import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const gameState = atom({
  key: "gameState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
