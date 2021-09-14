import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import moment from "moment";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { Box, Flex } from "../ui/layouts";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import { H1, H2, P, BigInput, Heading } from "../ui/atoms";
import { useQuery } from "graphql-hooks";
import gradient from "random-gradient";

import moralis from "../morialis";
import ReactHashAvatar from "react-hash-avatar";
import eth from "../ethers";
import { FaList, FaEye, FaArrowLeft } from "react-icons/fa";
import useCurrentUser from "../hooks/currentUser";
import Header from "./Header";
import { Owner } from "../ui/molecules";

import ether from "../assets/ether.png";
import { bag as bagAtom } from "../atoms";
import { useRecoilState } from "recoil";
import { shortenAddress } from "../utils";

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;

  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const NftContainer = styled.div`
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const Container = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.1);
  user-select: none;
  border-radius: 15px;
  position: relative;
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

const BAG_QUERY = `query BagQuery($id: ID!) {
  bag(id: $id) {
    id
    chest
    foot
    hand
    head
    neck
    ring
    image
    characterImage
    waist
    weapon
    currentOwner {
      address
      bagsHeld
    }
  }

  transfers(where: { bag: $id }) {
    from{
   address
  }
  to {
    address
 }
  timestamp
  txHash

  }
}`;

const NFT = ({ bag, lens }) => {
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
            height: "100%"
          }}
        />
      </NftContainer>
    </Container>
  );
};

function Home({ route }) {
  const { id } = useParams();
  const [bag, setBag] = useRecoilState(bagAtom(id));
  const currentUser = useCurrentUser();

  const history = useHistory();

  const { data, loading } = useQuery(BAG_QUERY, {
    variables: {
      id
    }
  });

  useEffect(() => {
    const getBagData = async () => {
      let json = atob(data.bag.image.substring(29));
      let parsed = JSON.parse(json);
      let ownerAddress = data.bag.currentOwner.address;

      let ens = await eth.provider.lookupAddress(ownerAddress);

      setBag({
        ...data.bag,
        ...parsed,
        name: parsed.name,
        shortName:
          ens || ownerAddress.slice(0, 3) + "..." + ownerAddress.slice(-4, -1)
      });
    };

    if (data && !bag) {
      getBagData();
    }
  }, [data]);

  return (
    <Box flex={1} flexDirection="column" bg="black">
      <Header />

      <Box p={3} pt={[1, 1, 1, 3]} maxWidth={"1300px"} margin="auto">
        <Flex
          onClick={() => history.goBack()}
          mb={3}
          alignItems="center"
          style={{ cursor: "pointer" }}
        >
          <FaArrowLeft size={16} color="white" />
          <P ml={2} style={{ fontSize: 16 }}>
            Back
          </P>
        </Flex>
        {bag && (
          <Flex flexWrap="wrap">
            <Box
              maxWidth={"650px"}
              width={[1, 1 / 2, 1 / 2, 6 / 12]}
              mr={[0, 4, 4]}
              mb={[3, 0, 0]}
            >
              <NFT bag={bag} lens="characters" />
            </Box>
            <Box
              flex={1}
              p={[3, 3, 4]}
              style={{
                borderRadius: 10,
                border: "2px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <Heading mb={2}>{bag.name}</Heading>
              <Link
                to={`/adventurer/${bag.currentOwner.address}`}
                style={{ textDecoration: "none" }}
              >
                <Owner
                  mb={4}
                  large
                  name={bag.shortName}
                  address={bag.currentOwner.address}
                />
              </Link>
              {[
                bag.weapon,
                bag.chest,
                bag.head,
                bag.waist,
                bag.foot,
                bag.hand,
                bag.neck,
                bag.ring
              ].map(item => (
                <P key={item} color="white" mb={3} style={{ fontSize: 16 }}>
                  {item}
                </P>
              ))}
            </Box>
          </Flex>
        )}

        {data && data.transfers && (
          <Box mt={4} mb={5} style={{}}>
            <H2 fontSize={22} mb={3} color="white">
              Transfers
            </H2>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <tr
                style={{ borderBottom: "2px solid rgba(255, 255, 255, 0.1)" }}
              >
                <th>
                  <P color="white">From</P>
                </th>
                <th>
                  <P color="white">To</P>
                </th>
                <th>
                  <P color="white">Date</P>
                </th>
              </tr>
              {data.transfers.map(transfer => {
                return (
                  <tr>
                    <td>
                      <P>{shortenAddress(transfer.from.address)}</P>
                    </td>
                    <td>
                      <P>{shortenAddress(transfer.to.address)}</P>
                    </td>
                    <td>
                      <P>{moment.unix(transfer.timestamp).fromNow()}</P>
                    </td>
                  </tr>
                );
              })}
            </table>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Home;
