import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Flex } from "../ui/layouts";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import { H1, H2, P, BigInput } from "../ui/atoms";
import { useQuery } from "graphql-hooks";
import moralis from "../morialis";
import { FaUpload } from "react-icons/fa";
import useCurrentUser from "../hooks/currentUser";
import Header from "./Header";

const DropContainer = styled.div`
  border: 2px dotted rgba(90, 103, 254, 0.6);
  border-radius: 25px;
`;
const DropZone = () => (
  <DropContainer>
    <Flex p={3} height={150} flexDirection="column">
      <Flex flex={1}>
        <FaUpload size={40} color="rgba(90, 103, 254, 0.6)" />
      </Flex>
      <H2>Select one of your NFTs below or drag an image here</H2>
    </Flex>
  </DropContainer>
);

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;

  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1800px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;

const NFT = ({ image, name }) => {
  if (image) {
    return (
      <Box>
        <Box
          style={{
            width: "100%",
            position: "relative",
            height: 0,
            paddingBottom: "100%",
            objectFit: "cover"
          }}
        >
          <img
            src={image}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: "100%",
              bottom: 0,
              left: 0,
              objectFit: "cover",
              borderRadius: 25
            }}
          />
        </Box>
        <P mt={2}>{name}</P>
      </Box>
    );
  }
  return false;
};

function Home() {
  let currentUser = useCurrentUser();
  console.log(currentUser);

  let [nfts, setNfts] = useState([]);
  useEffect(() => {
    getNFTs();
  }, [false]);

  const getNFTs = async () => {
    fetch(
      `https://api.opensea.io/api/v1/assets?owner=${currentUser.address}&limit=50&offset=0`
    )
      .then(res => res.json())
      .then(results => {
        setNfts(results.assets);
      });
  };

  const history = useHistory();
  return (
    <Flex flexDirection="column" flex={1}>
      <Header />

      <Box p={3} bg="#fbfbfb" flex={1}>
        {false && (
          <Box mb={3}>
            {" "}
            <DropZone />
          </Box>
        )}
        <Grid>
          <DropZone />
          {nfts.map((nft, i) => (
            <NFT key={i} image={nft.image_url} name={nft.name} />
          ))}
        </Grid>
      </Box>
    </Flex>
  );
}

export default Home;
