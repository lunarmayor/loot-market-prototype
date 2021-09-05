import React from "react";
import styled from "@emotion/styled";
import { Flex, Box } from "../ui/layouts";
import { BigInput } from "../ui/atoms";
import logo from "../assets/kitlogo.svg";
import avatar from "../assets/avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import brawlstars from "../assets/brawlstarz.png";
import { useLocation, useHistory } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const NavItem = styled.div`
  color: white;
  cursor: pointer;
  font-family: SupercellText Medium;
  margin-right: 24px;
  font-size: 16px;

  ${p =>
    p.active &&
    `
    color: #4832DC;
    `}
`;

export const Text = styled(NavItem)`
  font-size: 14px;
  margin-right: 0;
`;

let pathToNav = {
  "/": "Home",
  "/characters": "Characters"
};

let navToPath = {
  Home: "/",
  Characters: "/characters"
};

const Logo = styled.div`
  color: white;
  font-size: 24px;
  font-family: serif;
`;

const Header = ({ activeSawbnav }) => {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;

  const activeSubnav = pathToNav[pathname];

  return (
    <Box
      bg="black"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      <Flex alignItems="center" bg="black" p={3}>
        <Logo>Loot Marketplace</Logo>
      </Flex>
    </Box>
  );
};

export default Header;
