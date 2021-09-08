import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Flex } from "./ui/layouts";
import bg from "./assets/Rectangle.png";
import background from "./assets/bgs.png";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import { H1, H2, BigInput } from "./ui/atoms";
import Header from "./screens/Header";
import Home from "./screens/Home";
import useCurrentUser from "./hooks/currentUser";
import moralis from "./morialis";
import Login from "./screens/Login";

import AuthContainer from "./AuthContainer";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import { currentUser as currentUserAtom } from "./atoms";
import eth from "./ethers";

const theme = {
  colors: {
    primary: "hotpink"
  }
};

const client = new GraphQLClient({
  url: "http://localhost:4000/graphql"
});

const format = user => {
  return user
    ? {
        ...user.attributes,
        name: user.attributes.ethAddress
      }
    : null;
};

function App() {
  return (
    <RecoilRoot>
      <Router>
        <ClientContext.Provider value={client}>
          <ThemeProvider theme={theme}>
            <Flex flex={1} height="100%" flexDirection="column">
              <AuthContainer />
            </Flex>
          </ThemeProvider>
        </ClientContext.Provider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
