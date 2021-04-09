import React from "react";
import styled from "@emotion/styled";
import { Flex, Box } from "../ui/layouts";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Name = styled.div`
  color: rgba(0, 0, 0, 1);
  font-family: SupercellText Medium;
  font-size: 16px;
`;

const NavItem = styled.div`
  color: gray;
  font-family: SupercellText Medium;
  margin-right: 24px;
  font-size: 16px;

  ${p =>
    p.active &&
    `
    color: #007aff;
    `}
`;

const Header = () => (
  <Flex alignItems="center" p={3} style={{ borderBottom: "1px solid #eee" }}>
    <Flex flex={1} alignItems="center">
      <img style={{ width: 180, marginRight: 42 }} src={logo} />
      <NavItem active>Library</NavItem>
      <NavItem>News</NavItem>
      <NavItem>Upload</NavItem>
    </Flex>
    <Flex alignItems="center">
      <Box style={{ height: 35, width: 35 }}>
        <img style={{ width: 35, height: 35, borderRadius: 25 }} src={avatar} />
      </Box>
      <Box mx={2} mr={3}>
        <Name>morrissey</Name>
      </Box>
      <Box mt={1}>
        <FontAwesomeIcon icon={faChevronDown} color="rgba(0,0,0,0.7)" />
      </Box>
    </Flex>
  </Flex>
);

export default Header;
