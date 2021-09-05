import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Flex } from "../ui/layouts";
import bg from "../assets/Rectangle.png";
import background from "../assets/bgs.png";
import { useHistory } from "react-router-dom";
import { H1, H2, BigInput } from "../ui/atoms";
import giphy from "../assets/giphy-4.gif";
import giphy2 from "../assets/portaits.png";
import giphy3 from "../assets/spike.jpg";
import pass from "../assets/brawl_pass.png";
import colt from "../assets/Colt-4.png";
import emotes from "../assets/download.jpeg";
import starforce from "../assets/36v08htum8d61.png";
import mapbanners from "../assets/mapbanners.png";
import { useQuery } from "graphql-hooks";

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
`;

const Frame = styled.div`
  padding-bottom: 16px;
  background: black;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const LOOT_QUERY = `query LootQuery {
  getLoot {
    id
    name
    imageUrl
    currentPrice
    owner
    openSeaUrl
    ownerUrl
  }
}`;

const NFT = ({ asset }) => (
  <Box>
    <a href={asset.openSeaUrl} style={{ textDecoration: "none" }}>
      <Frame>
        <Flex p={3}>
          <H2>{asset.name}</H2>
        </Flex>
        <Box px={"9px"}>
          <img src={asset.imageUrl} />
        </Box>
        <Flex px={3} justifyContent="space-between">
          <Flex alignItems="center">
            <Box mr={2}>
              <img
                src={asset.ownerUrl}
                style={{ width: 25, height: 25, borderRadius: "50%" }}
              />
            </Box>
            {asset.owner && (
              <H2 style={{ color: "white", fontSize: 14 }}>@{asset.owner}</H2>
            )}
          </Flex>
          <H2>{asset.currentPrice} eth</H2>
        </Flex>
      </Frame>
    </a>
  </Box>
);

function Home() {
  const { loading, error, data } = useQuery(LOOT_QUERY);

  const history = useHistory();
  return (
    <Box p={3} flex={1}>
      <Box mb={4}>
        <BigInput />
      </Box>
      <Flex mt={3}>
        <Box mr={3}>
          <H2 mb={3}>
            <span style={{ color: "rgba(255,255,255, 0.9)" }}>Total:</span>{" "}
            {data && data.getLoot.length}
          </H2>
        </Box>
        <H2 mb={3}>
          {" "}
          <span style={{ color: "rgba(255,255,255, 0.9)" }}>Floor:</span> 8.3
          eth
        </H2>
      </Flex>

      <Grid>
        {!loading &&
          data &&
          data.getLoot.map(loot => <NFT key={loot.name} asset={loot} />)}
      </Grid>
    </Box>
  );
}

export default Home;
