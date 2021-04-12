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

const GridBlock = ({ item, ...props }) => (
  <Box
    p={3}
    style={{
      position: "relative",
      border: "1px solid #eee",
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: `0 1px 1px rgba(0,0,0,0.04),0 2px 2px rgba(0,0,0,0.04),0 4px 4px rgba(0,0,0,0.04),0 8px 8px rgba(0,0,0,0.04)`
    }}
    bg="white"
    height="200px"
    {...props}
  >
    <Box>
      <img
        style={{
          position: "absolute",
          zIndex: 0,
          padding: 24,
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          height: "100%",
          width: "100%",
          maxWidth: 300,
          margin: "auto",
          objectFit: "contain",
          ...(item.cover && {
            objectFit: "cover",
            maxWidth: null,
            padding: 0
          })
        }}
        src={item.asset}
      />
      <H2
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          zIndex: 10,
          color: item.white ? "white" : "black"
        }}
      >
        {item.name}
      </H2>
    </Box>
  </Box>
);

function Home() {
  const history = useHistory();
  return (
    <Box p={3} flex={1}>
      <Box
        p={3}
        pb={6}
        m={-3}
        mb={-6}
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <H1>Content Library</H1>
        <Box width={1} mt={3}>
          <BigInput placeholder="Search for assets by name, type, or tag" />
        </Box>
      </Box>
      <Grid>
        {data.map(item => (
          <GridBlock item={item} onClick={() => history.push("/characters")} />
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
