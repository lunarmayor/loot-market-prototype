import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "../ui/layouts";
import logo from "../assets/logo.png";
import lunar from "../assets/lunar3.png";
import { H1, H2, P, BigInput } from "../ui/atoms";
import useCurrentUser from "../hooks/currentUser";
import { useRecoilCallback } from "recoil";

import ENS, { getEnsAddress } from "@ensdomains/ensjs";
import moralis from "../morialis";

const AccountContainer = styled.div`
  background: #5a67fe;
  padding: 12px 24px;
  padding-right: 42px;
  border-radius: 50px;
  color: white;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Source code Pro;
`;

const Account = () => {
  const currentUser = useCurrentUser();
  const [ensName, setEnsName] = useState(null);

  useEffect(() => {
    const getName = async () => {
      let provider = await moralis.Web3.activeWeb3Provider.activate();
      const ens = new ENS({
        provider,
        ensAddress: getEnsAddress("1")
      });

      let name = await ens.getName(currentUser.name);
      console.log(name);
      setEnsName(name);
    };

    setTimeout(() => {
      getName();
    }, 1000);
    getName();
  }, [currentUser]);

  return (
    <Box style={{ position: "relative" }}>
      <AccountContainer>{ensName || currentUser.name}</AccountContainer>
      <img
        src={lunar}
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          position: "absolute",
          /* left: 0; */
          right: 8,
          top: "50%",
          transform: "translate(0, -50%)"
        }}
      />
    </Box>
  );
};

function Header({ border }) {
  return (
    <Flex
      p={3}
      justifyContent="space-between"
      bg="white"
      alignItems="center"
      style={{ borderBottom: (border ? 1 : 0) + "px solid #dedede" }}
    >
      <Flex alignItems="center">
        <Box mr={2}>
          <img
            style={{
              width: 30,
              border: "2px solid white",
              display: "block",
              borderRadius: "50%"
            }}
            src={logo}
          />
        </Box>
        <H1 style={{ fontSize: 18 }}>Art Machine</H1>
      </Flex>
      <Account />
    </Flex>
  );
}

export default Header;
