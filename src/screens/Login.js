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
import ethers from "../ethers";

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

  const loginWithWalletConnect = async () => {
    await ethers.logIn();
    setCurrentUser(ethers.user);
  };

  const loginWithMetaMask = () => {};

  return (
    <Box p={3} flex={1}>
      <Flex
        flex={1}
        height="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <H1 style={{ fontSize: 50, fontFamily: "serif" }} mb={2}>
          Loot
        </H1>
        <P style={{ maxWidth: 400, fontWeight: 400, textAlign: "center" }}>
          Loot is randomized adventurer gear generated and stored on chain.
          Stats, images, and other functionality are intentionally omitted for
          others to interpret. Feel free to use Loot in any way you want.
        </P>

        <Box mt={5}>
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
