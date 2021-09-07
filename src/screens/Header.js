import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "../ui/layouts";
import logo from "../assets/logo.png";
import { H1, H2, P, BigInput } from "../ui/atoms";
import useCurrentUser from "../hooks/currentUser";

const AccountContainer = styled.div`
  background: #5a67fe;
  padding: 12px 24px;
  border-radius: 50px;
  color: white;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Account = () => {
  const currentUser = useCurrentUser();

  return (
    <Box>
      <AccountContainer>{currentUser.name}</AccountContainer>
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
