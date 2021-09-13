import { atom, atomFamily } from "recoil";

export const currentUser = atom({
  key: "currentUser", // unique ID (with respect to other atoms/selectors)
  default: null
});

export const bags = atom({
  key: "bags", // unique ID (with respect to other atoms/selectors)
  default: []
});

export const bag = atomFamily({
  key: "bag",
  default: null
});

export const userBags = atomFamily({
  key: "userBags",
  default: []
});
