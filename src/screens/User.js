import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, Flex } from "../ui/layouts";
import { useHistory, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { H1, H2, P, BigInput } from "../ui/atoms";
import { useQuery } from "graphql-hooks";
import gradient from "random-gradient";
import { useRecoilState } from "recoil";
import { userBags as userBagsAtom } from "../atoms";

import moralis from "../morialis";
import ReactHashAvatar from "react-hash-avatar";
import eth from "../ethers";
import { FaList, FaEye, FaTag, FaFilter } from "react-icons/fa";
import useCurrentUser from "../hooks/currentUser";
import Header from "./Header";
import { NFT } from "./Home";

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

const WALLET_QUERY = ` query Wallet($id: ID!){
  wallet(id: $id) {
    id
    address
    bagsHeld
    bags {
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
  }
}`;

function User() {
  const { id } = useParams();

  let shortId = id.slice(0, 3) + "..." + id.slice(-4, -1);

  const [bags, setBags] = useRecoilState(userBagsAtom(id));
  const currentUser = useCurrentUser();
  const [ens, setEns] = useState(null);
  const { data, loading } = useQuery(WALLET_QUERY, {
    variables: {
      id: id.toLocaleLowerCase()
    }
  });
  const [lens, setLens] = useState("characters");

  useEffect(() => {
    const loadNfts = async () => {
      let newBags = await Promise.all(
        data.wallet.bags.map(async bag => {
          let json = atob(bag.image.substring(29));
          let parsed = JSON.parse(json);
          let owner = bag.currentOwner.address;

          let newEns = await eth.provider.lookupAddress(owner);
          setEns(newEns || owner.slice(0, 3) + "..." + owner.slice(-4, -1));

          return {
            ...bag,
            tokenId: bag.id,
            image: parsed.image,
            name: parsed.name,
            address: owner,
            owner: newEns || owner,
            shortName: newEns || owner.slice(0, 3) + "..." + owner.slice(-4, -1)
          };
        })
      );

      setBags(newBags);
    };

    if (!bags.length && data) {
      loadNfts();
    }
  }, [data]);

  let bagsHeld = data && data.wallet && data.wallet.bagsHeld;

  return (
    <Flex flex={1} flexDirection="column" bg="black">
      <Header />
      <Box p={3} pb={2}>
        <Owner address={id} name={ens || shortId} large />
        <Box mt={3}>
          <P>
            {bagsHeld} {bagsHeld > 1 ? "Bags" : "Bag"}
          </P>
        </Box>
      </Box>
      <Box p={3} pt={0}>
        <Grid>
          {bags.map(loot => (
            <Link
              key={loot.tokenId}
              to={`/bag/${loot.tokenId}`}
              style={{ textDecoration: "none" }}
            >
              <NFT bag={loot} lens={lens} noName />
            </Link>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
}

export default User;
