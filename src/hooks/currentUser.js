import { useState, useEffect } from "react";
import { selector, useRecoilValue } from "recoil";
import { currentUser as currentUserAtom } from "../atoms";

import moralis from "../morialis";

const useCurrentUser = () => {
  let user = useRecoilValue(currentUserAtom);
  return user;
};

export default useCurrentUser;
