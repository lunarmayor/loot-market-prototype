import { atom } from "recoil";
import moralis from "./morialis";

export const currentUser = atom({
  key: "currentUser", // unique ID (with respect to other atoms/selectors)
  default: moralis.User.current() // default value (aka initial value)
});
