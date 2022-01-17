import { atom } from "recoil";

export const captionState = atom({
  key: "captionState", // unique ID (with respect to other atoms/selectors)
  default: {
    caption: null,
    types: {
      pickup: {
        text: "What is that bonfire?",
        hasTriggered: false,
        triggerOnce: true,
      },
      bonfire: {
        text: "Looks like I've got a coin to spend!",
        hasTriggered: false,
        triggerOnce: true,
      },
      trees: {
        text: "Those trees will be a pain to chop down.",
        hasTriggered: false,
        triggerOnce: true,
      },
      totem: {
        text: "Those look helpful :)",
        hasTriggered: false,
        triggerOnce: true,
      },
    },
  }, // default value (aka initial value)
});
