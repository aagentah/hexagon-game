import * as _ from "lodash";
import { getRecoil, setRecoil } from "recoil-nexus";

import { captionState } from "../state/caption";

export const setCaption = async ({ type }) => {
  let caption = _.cloneDeep(getRecoil(captionState));

  if (caption.types[type].triggerOnce && caption.types[type].hasTriggered) {
    return;
  }

  caption.caption = caption.types[type].text;
  await setRecoil(captionState, caption);

  setTimeout(async () => {
    caption = _.cloneDeep(getRecoil(captionState));
    caption.caption = null;
    caption.types[type].hasTriggered = true;
    await setRecoil(captionState, caption);
  }, 3000);
};
