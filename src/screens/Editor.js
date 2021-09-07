import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Flex } from "../ui/layouts";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import { H1, H2, P, BigInput, Button } from "../ui/atoms";
import { useQuery } from "graphql-hooks";
import moralis from "../morialis";
import { FaUpload, FaMix, FaAdjust } from "react-icons/fa";
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
  return (
    <Flex flexDirection="column" overflow="hidden" flex={1}>
      <Header border />

      <Flex bg="#fbfbfb" bg="#E5E5E5" flex={1}>
        <Box p={3} flex={1}>
          <img
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain"
            }}
            src="https://lh3.googleusercontent.com/xeUZP17cF_xlZo9Hqv6is49JxJt42awjRDGGs6wVBNzAnpIJgm0amIiiupPezzaewi81KGb3mSM2R74dtf5NXkwvrAfkUTwp5_MWaEQ"
          />
        </Box>
        <Flex width={300} bg="white" bg="#fbfbfb" flexDirection="column">
          <Flex p={3} bg="white" style={{ borderBottom: "1px solid #dedede" }}>
            <FaAdjust color="#5968fe" size={20} />
            <H2 ml={2}>Filters</H2>
          </Flex>
          <Box flex={1} overflow="auto">
            {[0, 1, 2, 3, 4, 5, 6].map(i => (
              <Flex p={3}>
                <Box>
                  <img
                    src="https://gradientjoy.com/200"
                    style={{ width: 30, height: 20, borderRadius: "50%" }}
                  />
                </Box>
                <P>Filter 1</P>
              </Flex>
            ))}
          </Box>
          <Box p={3} style={{ borderTop: "1px solid #dedede" }}>
            <Box mb={3}>
              <Button>Download</Button>
            </Box>
            <Button dark>Mint as NFT</Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Home;
