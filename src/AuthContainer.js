import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import bg from "./assets/Rectangle.png";
import background from "./assets/bgs.png";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import { H1, H2, BigInput } from "./ui/atoms";
import { Box } from "./ui/layouts";
import Header from "./screens/Header";
import Home from "./screens/Home";
import moralis from "./morialis";
import Login from "./screens/Login";
import Editor from "./screens/Editor";
import eth from "./ethers";

import { atom, useRecoilState } from "recoil";
import { currentUser as currentUserAtom } from "./atoms";

function AuthContainer() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

  let [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const connect = async () => {
      await eth.connect();
      setCurrentUser(eth.user);
      setLoaded(true);
    };

    connect();
  }, []);

  useEffect(() => {
    //setCurrentUser(moralis.User.current());
  }, []);

  if (!loaded) {
    return <Box />;
  }

  return currentUser ? (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/editor" exact component={Editor} />
    </Switch>
  ) : (
    <Login />
  );
}

export default AuthContainer;
