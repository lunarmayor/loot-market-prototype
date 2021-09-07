import React from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "../ui/layouts";
import { H1, P, Button } from "../ui/atoms";
import logo from "../assets/logo.png";
import metamask from "../assets/metamask.png";
import walletconnect from "../assets/walletconnect-logo.svg";
import moralis from "../morialis";
import { HueRotate } from "gl-react-hue-rotate";
import { Shaders, Node, GLSL } from "gl-react";
import useCurrentUser from "../hooks/currentUser";
import { Surface } from "gl-react-dom";
import { currentUser as currentUserAtom } from "../atoms";
import { useRecoilState } from "recoil";

import { keyframes } from "@emotion/react";
const rotate = keyframes`
  0% {
    transform:rotate(0deg)scale(1);
  }

  50% {
    transform:rotate(180deg)scale(1.1);

  }

  100% {
    transform:rotate(360deg)scale(1);

  }


`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
`;

const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}`
  }
});

const Rotater = styled.div`
  animation: ${rotate} 5s linear infinite;
`;

function Home() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

  const loginWithWalletConnect = () => {
    moralis.Web3.authenticate({ provider: "walletconnect" })
      .then(function(user) {
        setCurrentUser(moralis.User.current());
      })
      .catch(console.log);
  };

  const loginWithMetaMask = () => {
    moralis.Web3.authenticate()
      .then(function(user) {
        setCurrentUser(moralis.User.current());
      })
      .catch(console.log);
  };

  return (
    <Box p={3} flex={1}>
      <Flex
        flex={1}
        height="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box mb={"50px"} style={{ zIndex: 1 }}>
          <Rotater>
            <img style={{ width: 250, zIndex: 1 }} src={logo} />
          </Rotater>
        </Box>
        <H1 mb={2}>Art Machine</H1>
        <P>Remix your NFTs to create more NFTs</P>

        <Box mt={5}>
          <Box mb={3}>
            <Button onClick={loginWithMetaMask}>
              <Flex justifyContent="center" alignItems="center">
                <img style={{ width: 30 }} src={metamask} />
                <Box flex={1} ml={3}>
                  MetaMask
                </Box>
              </Flex>
            </Button>
          </Box>

          <Button onClick={loginWithWalletConnect}>
            <Flex justifyContent="center" alignItems="center">
              <img style={{ width: 30 }} src={walletconnect} />
              <Box flex={1} ml={3}>
                WalletConnect
              </Box>
            </Flex>
          </Button>
          <P mt={4}>Connect your wallet to start</P>
        </Box>
      </Flex>
    </Box>
  );
}

export default Home;
