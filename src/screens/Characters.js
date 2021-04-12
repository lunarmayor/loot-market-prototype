import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Flex } from "../ui/layouts";
import Masonry from "react-masonry-css";

import bg from "../assets/Rectangle.png";
import background from "../assets/bgs.png";
import { H1, H2, BigInput } from "../ui/atoms";
import giphy from "../assets/giphy-4.gif";
import giphy2 from "../assets/portaits.png";
import giphy3 from "../assets/spike.jpg";
import pass from "../assets/brawl_pass.png";
import colt from "../assets/Colt-4.png";
import emotes from "../assets/download.jpeg";
import starforce from "../assets/36v08htum8d61.png";
import mapbanners from "../assets/mapbanners.png";
import bit from "../assets/portrait_8bit.png";
import amber from "../assets/portrait_amber.png";
import barely from "../assets/portrait_barley.png";
import bea from "../assets/portrait_bea.png";
import bibi from "../assets/portrait_bibi.png";
import carl from "../assets/portrait_carl.png";

import bit2 from "../assets/8Bit-11.png";
import amber2 from "../assets/Amber-41.png";
import barley2 from "../assets/Barley-9.png";
import barley3 from "../assets/Barley-14.png";
import carl2 from "../assets/Carl-7.png";
import dog from "../assets/36v08htum8d61.png";
import shelly from "../assets/shelly-fighter-brawl-stars.jpg";

const Grid = styled.div`
  width: 100%;
  display: grid;
  margin-top: 24px;
  grid-template-columns: 1fr 1fr 1fr;

  grid-gap: 24px;
`;

const data = [
  { name: "Characters", asset: colt },
  { name: "Pins", asset: giphy },
  { name: "Backgrounds", asset: background },
  { name: "Portraits", asset: giphy2 },
  { name: "Game UI", asset: pass },
  { name: "Latest", asset: starforce },
  { name: "3D Models", asset: giphy3 },
  { name: "Map Banners", asset: mapbanners }
];

const Text = styled.p`
  margin: 0;
  font-family: SupercellText Bold;
  font-size: 22px;
`;

const tags = [
  {
    name: "8bit",
    image: bit
  },
  {
    name: "Amber",
    image: amber
  },
  {
    name: "Barley",
    image: barely
  },
  {
    name: "Bea",
    image: bea
  },
  {
    name: "Bibi",
    image: bibi
  }
];

const assets = [
  { name: "Colt", asset: colt },
  { name: "Carl", asset: carl2 },
  {
    name: "8bit celebration",
    asset: bit2
  },
  {
    name: "Dog",
    asset: dog
  },
  {
    name: "Shelly",
    asset: shelly
  },
  {
    name: "amber celebration",
    asset: amber2
  },
  {
    name: "barely celebration",
    asset: barley2
  },
  {
    name: "barely sad",
    asset: barley3
  }
];

const Tag = ({ name, image }) => (
  <Flex
    style={{ borderRadius: 10, overflow: "hidden" }}
    bg="white"
    pr={3}
    alignItems="center"
    mr={2}
  >
    <Box mr={2}>
      <img
        src={image}
        style={{
          width: 60,
          height: 50,
          display: "block",
          backgroundColor: "#eee"
        }}
      />
    </Box>
    <Text>{name}</Text>
  </Flex>
);

function Home() {
  return (
    <Box p={3} flex={1}>
      <Box
        p={3}
        m={-3}
        pb={6}
        mb={-6}
        //pb={4}
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <H1>Library > Characters</H1>
        <Box width={1} mt={3}>
          <BigInput placeholder="Search characters" />
        </Box>
        <Flex mt={4} flexDirection="row">
          {tags.map(tag => (
            <Tag {...tag} />
          ))}
        </Flex>
      </Box>
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {assets.map(asset => (
          <Box
            bg="white"
            style={{
              borderRadius: 10,
              border: "1px solid #ddd",
              boxShadow: `0 1px 1px rgba(0,0,0,0.04),0 2px 2px rgba(0,0,0,0.04),0 4px 4px rgba(0,0,0,0.04),0 8px 8px rgba(0,0,0,0.04)`,
              overflow: "hidden"
            }}
          >
            <Box style={{ position: "relative" }}>
              <img
                src={asset.asset}
                style={{ width: "100%", display: "block" }}
              />
            </Box>
            <Flex
              justifyContent="space-between"
              p={3}
              style={{ borderTop: "1px solid #ddd" }}
            >
              <Text style={{ fontSize: 18 }}>{asset.name}</Text>
              <Box
                p={1}
                px={2}
                style={{
                  borderRadius: 100,
                  fontSize: 13,
                  background: "#1FA9F5",
                  color: "white",
                  fontFamily: "SupercellText Bold"
                }}
              >
                PNG
              </Box>
            </Flex>
          </Box>
        ))}
      </Masonry>

      <Grid></Grid>
    </Box>
  );
}

export default Home;
