import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Flex } from "./ui/layouts";
import bg from "./assets/Rectangle.png";
import background from "./assets/bgs.png";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import { H1, H2, BigInput } from "./ui/atoms";
import Header from "./screens/Header";
import giphy from "./assets/giphy-4.gif";
import giphy2 from "./assets/portaits.png";
import giphy3 from "./assets/spike.jpg";
import pass from "./assets/brawl_pass.png";
import colt from "./assets/Colt-4.png";
import emotes from "./assets/download.jpeg";
import starforce from "./assets/36v08htum8d61.png";
import mapbanners from "./assets/mapbanners.png";
import Home from "./screens/Home";
const theme = {
  colors: {
    primary: "hotpink"
  }
};

const client = new GraphQLClient({
  url: "http://localhost:4000/graphql"
});

function App() {
  return (
    <Router>
      <ClientContext.Provider value={client}>
        <ThemeProvider theme={theme}>
          <Flex flex={1} height="100%" bg="#0f0f0f" flexDirection="column">
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </Flex>
        </ThemeProvider>
      </ClientContext.Provider>
    </Router>
  );
}

export default App;
