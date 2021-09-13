import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "../ui/layouts";
import logo from "../assets/logo.png";
import lunar from "../assets/lunar3.png";
import { H1, H2, P, BigInput } from "../ui/atoms";
import { useHistory } from "react-router-dom";
import useCurrentUser from "../hooks/currentUser";
import { useDebounce } from "use-debounce";
import { useRecoilCallback } from "recoil";
import { Link } from "react-router-dom";
import ReactHashAvatar from "react-hash-avatar";
import { ethers } from "ethers";
import eth from "../ethers";
import { shortenAddress } from "../utils";

import ENS, { getEnsAddress } from "@ensdomains/ensjs";

const AccountContainer = styled.div`
  background: #333333;
  padding: 12px 24px;
  padding-right: 48px;
  border-radius: 50px;
  color: white;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Source code Pro;
  font-weight: 600;
`;

const Account = () => {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return (
      <AccountContainer style={{ paddingRight: 24 }}>
        Connect to Wallet
      </AccountContainer>
    );
  }

  return (
    <Box style={{ position: "relative" }}>
      <AccountContainer>{currentUser.name}</AccountContainer>

      <Box
        width={30}
        height={30}
        style={{
          overflow: "hidden",
          borderRadius: "50%",
          position: "absolute",
          /* left: 0; */
          right: 8,
          top: "50%",
          transform: "translate(0, -50%)"
        }}
      >
        <ReactHashAvatar name={currentUser.address} width={30} height={30} />
      </Box>
    </Box>
  );
};

const SearchContainer = styled.div`
  position: absolute;
  top: 47px;
  z-index: 100;
  left: 0;
  background: #0d0d0d;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  right: 0;
  overflow: hidden;
  maxheight: 500px;
`;

const ItemWrapper = styled(Box)`
  background: #0d0d0d;
  cursor: pointer;

  transition: background 300ms ease-in-out;

  &:hover {
    background: #282828;
  }
`;

const SearchResults = ({ results, handleSelection }) => {
  if (results.length === 0) {
    return false;
  }

  return (
    <SearchContainer>
      {results.map(result => {
        return (
          <Link
            to={`/${result.type == "bag" ? "bag" : "adventurer"}/${result.id}`}
            onClick={handleSelection}
            style={{ textDecoration: "none" }}
          >
            <ItemWrapper p={3}>
              <P color="white">{result.label}</P>
            </ItemWrapper>
          </Link>
        );
      })}
    </SearchContainer>
  );
};

const NavItem = styled(P)`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 16px;
`;

function Header({ border }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const history = useHistory();

  const [results, setResults] = useState([]);
  const currentUser = useCurrentUser();

  const handleSearch = async () => {
    let bagNum = parseInt(debouncedQuery);

    if (bagNum && bagNum > 0 && bagNum < 7801) {
      return setResults([{ type: "bag", label: "Bag " + bagNum, id: bagNum }]);
    }

    if (ethers.utils.isAddress(debouncedQuery)) {
      return setResults([
        {
          type: "address",
          label: "Wallet: " + shortenAddress(debouncedQuery),
          id: debouncedQuery
        }
      ]);
    }

    if (/.*\.eth$/.test(debouncedQuery)) {
      let address = await eth.provider.resolveName(debouncedQuery);

      if (address) {
        return setResults([
          {
            type: "address",
            label: "Wallet: " + debouncedQuery,
            id: address
          }
        ]);
      }
    }

    setResults([]);
  };

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      handleSearch();
    }
  }, [debouncedQuery]);
  return (
    <Flex
      p={3}
      justifyContent="space-between"
      bg="black"
      alignItems="center"
      style={{ borderBottom: (border ? 1 : 0) + "px solid #dedede" }}
    >
      <Flex alignItems="center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <H1 style={{ fontSize: 24 }}>Loot</H1>
        </Link>
      </Flex>
      <Flex mx={4} flex={1} alignItems="center">
        <Box style={{ position: "relative" }}>
          <BigInput
            style={{
              borderBottomRightRadius: results.length ? 0 : 10,
              borderBottomLeftRadius: results.length ? 0 : 10
            }}
            placeholder="Search by bag #, item, or owner"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.charCode == 0) {
                let result = results[0];

                if (result) {
                  history.push(
                    `/${result.type === "bag" ? "bag" : "adventurer"}/${
                      result.id
                    }`
                  );

                  setResults([]);
                  setQuery("");
                }
              }
            }}
          />
          <SearchResults
            results={results}
            handleSelection={() => {
              setResults([]);
              setQuery("");
            }}
          />
        </Box>

        <NavItem ml={4}>Explore</NavItem>
        <NavItem ml={4}>Projects</NavItem>
      </Flex>
      <Flex mr={4}>
        <Link
          to={"/adventurer/" + currentUser.address}
          style={{ textDecoration: "none" }}
        >
          <NavItem>My Loot</NavItem>
        </Link>
      </Flex>
      <Account />
    </Flex>
  );
}

export default Header;
