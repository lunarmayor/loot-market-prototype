import React, { useState } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Flex } from "../ui/layouts";
import Masonry from "react-masonry-css";
import { Text as T } from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import supercellLogo from "../assets/supercelllogo.png";
import {
  faDownload,
  faHeart,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

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
  font-size: 18px;
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
  { name: "Sandy", asset: "https://pbs.twimg.com/media/EymOY8GW8AQaIRI.jpg" },
  {
    name: "8bit celebration",
    asset: bit2
  },
  {
    name: "Colonel Ruff",
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
    name: "barley celebration",
    asset: barley2
  },
  {
    name: "barley sad",
    asset: barley3
  }
];

const Overlay = styled(Box)`
  position: absolute;
  background: rgba(0, 0, 0, 0.03);
  display: none;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const Container = styled(Box)`
  position: relative;
  cursor: zoom-in;
  &:hover .overlay {
    display: block;
  }
  &:hover {
    outline: 1px solid #ddd;
  }
`;

const Button = styled(Box)`
  padding: 10px;
  border: 1px solid #eee;
  background: white;
  cursor: pointer !important;
  border-radius: 8px;
`;

const Image = ({ asset, name, ...props }) => (
  <Container {...props}>
    <img src={asset.asset} style={{ width: "100%" }} />
    <Overlay className="overlay">
      <Box style={{ position: "absolute", bottom: 10, right: 10 }}>
        <Button>
          <FontAwesomeIcon icon={faDownload} color="rgba(0,0,0,0.7)" />
        </Button>
      </Box>

      <Box style={{ position: "absolute", top: 10, right: 10 }}>
        <Button>
          <FontAwesomeIcon icon={faHeart} color="rgba(0,0,0,0.7)" />
        </Button>
      </Box>
      <Box style={{ position: "absolute", bottom: 10, left: 10 }}>
        <img
          src={supercellLogo}
          style={{ width: 30, borderRadius: 100, cursor: "pointer" }}
        />
      </Box>
    </Overlay>
  </Container>
);

const Tag = ({ name, image }) => (
  <Flex
    style={{ borderRadius: 10, overflow: "hidden", border: "1px solid #ddd" }}
    bg="white"
    pr={3}
    alignItems="center"
    mr={2}
  >
    <Box mr={2}>
      <img
        src={image}
        style={{
          width: 50,
          height: 40,
          display: "block",
          backgroundColor: "#eee"
        }}
      />
    </Box>
    <Text>{name}</Text>
  </Flex>
);

function Home() {
  const [activeImage, setActiveImage] = useState(null);

  if (activeImage) {
    return (
      <Box flex={1} style={{ position: "relative", overflow: "hidden" }}>
        <Flex
          onClick={() => setActiveImage(null)}
          style={{
            border: "1px solid #ddd",
            position: "absolute",
            top: 18,
            left: 18,
            zIndex: 1000,
            borderRadius: 1000
          }}
          justifyContent="center"
          alignItems="center"
          width={50}
          height={50}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" color="rgba(0,0,0,0.7)" />
        </Flex>
        <Box
          width={2 / 3}
          p={3}
          height="100%"
          style={{ borderRight: "1px solid #ddd", overflow: "hidden" }}
        >
          <img
            src={activeImage}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box p={3} flex={1}>
      <Box
        p={3}
        m={-3}
        pb={6}
        mb={-6}
        //pb={4}
        //  style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <H1 style={{ fontSize: 32 }}>Characters</H1>

        <Flex mt={3} flexDirection="row">
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
          <Image asset={asset} onClick={() => setActiveImage(asset.asset)} />
        ))}
      </Masonry>

      <Grid></Grid>
    </Box>
  );
}

export default Home;
