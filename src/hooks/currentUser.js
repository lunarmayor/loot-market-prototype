import { useState, useEffect } from "react";
import { selector, useRecoilValue } from "recoil";
import { currentUser as currentUserAtom } from "../atoms";

import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import moralis from "../morialis";

const ens = new ENS({
  provider: moralis.getWeb3Provider(),
  ensAddress: getEnsAddress("1")
});

const format = user => {
  return user
    ? {
        ...user.attributes,
        name: user.attributes.ethAddress
      }
    : null;
};

const formattedUser = selector({
  key: "formattedUser",
  get: ({ get }) => {
    const currentUser = get(currentUserAtom);

    return format(currentUser);
  }
});

const useCurrentUser = () => {
  let user = useRecoilValue(formattedUser);
  return user;
};

export default useCurrentUser;
