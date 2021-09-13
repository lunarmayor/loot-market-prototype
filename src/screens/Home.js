import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Flex } from "../ui/layouts";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import { H1, H2, P, BigInput } from "../ui/atoms";
import { useQuery } from "graphql-hooks";
import gradient from "random-gradient";
import { useRecoilState } from "recoil";
import { bags as bagsAtom } from "../atoms";

import moralis from "../morialis";
import ReactHashAvatar from "react-hash-avatar";
import eth from "../ethers";
import { FaList, FaEye, FaTag, FaFilter } from "react-icons/fa";
import useCurrentUser from "../hooks/currentUser";
import Header from "./Header";

import { Owner } from "../ui/molecules";

import ether from "../assets/ether.png";

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;

  @media (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 820px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1520px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const NftContainer = styled.div`
  border-radius: 15px;
  position: relative;
  width: 100%;

  height: 0;
  padding-bottom: 100%;
`;

const Container = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  position: relative;
  user-select: none;
  overflow: hidden;
`;

const Select = styled.select`
  padding: 14px 16px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.2);
  font-size: 14px;
  background: black;
  color: white;
  font-family: Source Code Pro;
  font-weight: 700;
  padding-left: 42px;
  border-radius: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const StatContainer = styled.div`
  background: gray;
`;

const OpenContainer = styled.div`
  background: black;
  cursor: pointer;
  width: 35px;
  height: 35px;
  position: absolute;
  top: 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  z-index: 10;
  right: 12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Leadin = styled(P)`
  font-size: 12px;
  font-weight: 500;
  color: white;
`;

const BAGS_QUERY = `{
  bags(first: 30) {
    id
    image
    characterImage
    chest
    foot
    hand
    head
    neck
    ring
    waist
    weapon
    currentOwner {
      address
      bagsHeld
    }
  }
}`;

export const NFT = ({ bag, lens, noName }) => {
  const [viz, setViz] = useState(true);
  let image = lens === "loot" ? bag.image : bag.characterImage;

  useEffect(() => {
    setViz(true);
  }, [lens]);

  return (
    <Container>
      {lens != "loot" && (
        <OpenContainer
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
            setViz(!viz);
          }}
        >
          {viz ? (
            <FaList color="rgba(255, 255, 255, 0.7)" />
          ) : (
            <FaEye color="rgba(255, 255, 255, 0.7)" />
          )}
        </OpenContainer>
      )}
      <NftContainer>
        <img
          src={!viz ? bag.image : image}
          style={{
            padding: lens == "loot" || (!viz && lens == "characters") ? 10 : 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            objectFit: "cover"
          }}
        />
      </NftContainer>
      <Box p={3} style={{ borderTop: "2px solid rgba(255, 255, 255, 0.1)" }}>
        <Flex justifyContent="space-between" alignItems="center">
          <P>{bag.name}</P>
          <Flex alignItems="center">
            <img src={ether} style={{ width: 18 }} />
            <P style={{ color: "white", fontWeight: 600 }}>15</P>
          </Flex>
        </Flex>
        {!noName && (
          <Link
            to={`/adventurer/${bag.address}`}
            style={{ textDecoration: "none" }}
          >
            <Owner mt={2} name={bag.shortName} address={bag.address} />
          </Link>
        )}
      </Box>
    </Container>
  );
};

function Home() {
  const [bags, setBags] = useRecoilState(bagsAtom);
  const currentUser = useCurrentUser();
  const { data, loading } = useQuery(BAGS_QUERY);
  const [lens, setLens] = useState("characters");

  useEffect(() => {
    const loadNfts = async () => {
      let newBags = await Promise.all(
        data.bags.map(async bag => {
          let json = atob(bag.image.substring(29));
          let parsed = JSON.parse(json);
          let owner = bag.currentOwner.address;

          let ens = await eth.provider.lookupAddress(owner);

          return {
            ...bag,
            tokenId: bag.id,
            image: parsed.image,
            name: parsed.name,
            address: owner,
            owner: ens || owner,
            shortName: ens || owner.slice(0, 3) + "..." + owner.slice(-4, -1)
          };
        })
      );

      setBags(newBags);
    };

    if (!bags.length && data) {
      loadNfts();
    }
  }, [data]);

  return (
    <Flex flex={1} flexDirection="column" bg="black">
      <Header />
      <Flex justifyContent="space-between" p={3} pt={2} alignItems="center">
        <Flex>
          <Box style={{ position: "relative" }}>
            <FaFilter
              size={14}
              color="rgba(255,255,255,0.9)"
              style={{ position: "absolute", left: 16, top: 18 }}
            />
            <Select>
              <option>For Sale</option>
            </Select>
          </Box>
        </Flex>
        <Box display={["none", "none", "block", "block"]}>
          <Flex
            bg="#1B1B19"
            alignItems="flex-end"
            style={{
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.05)"
            }}
          >
            <Box
              p={2}
              px={4}
              style={{ borderRight: "1px solid black", textAlign: "center" }}
            >
              <Leadin>Bags</Leadin>
              <P>7.8k</P>
            </Box>

            <Box
              p={2}
              px={4}
              style={{ borderRight: "1px solid black", textAlign: "center" }}
            >
              <Leadin>Owners</Leadin>
              <P>2.1k</P>
            </Box>
            <Box p={2} px={4} style={{ textAlign: "center" }}>
              <Leadin>Floor</Leadin>
              <Flex alignItems="center">
                <Box>
                  <img src={ether} style={{ width: 16, display: "block" }} />
                </Box>
                <P>15</P>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Flex>
          <Box style={{ position: "relative" }}>
            <FaEye
              color="rgba(255,255,255,0.9)"
              style={{ position: "absolute", left: 14, top: 16 }}
            />
            <Select onChange={e => setLens(e.target.value)}>
              <option value="characters">Character</option>
              <option value="loot">Loot</option>
            </Select>
          </Box>
        </Flex>
      </Flex>
      <Box p={3} pt={0}>
        <Grid>
          {bags.map(loot => (
            <Link
              key={loot.tokenId}
              to={`/bag/${loot.tokenId}`}
              style={{ textDecoration: "none" }}
            >
              <NFT bag={loot} lens={lens} />
            </Link>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
}

export default Home;
