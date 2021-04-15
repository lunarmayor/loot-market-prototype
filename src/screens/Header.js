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

const Header = ({ activeSawbnav }) => {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;

  const activeSubnav = pathToNav[pathname];

  return (
    <Box
      bg="white"
      style={{
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      <Flex alignItems="center" bg="white" p={3}>
        <Flex flex={1} alignItems="center">
          <img
            style={{ width: 50, marginRight: 24, borderRadius: 3 }}
            src={logo}
          />
          <Box flex={1} mr={4}>
            <BigInput placeholder="search for assets by name, type, or tag" />
          </Box>
          <NavItem active>Library</NavItem>
          <NavItem>News</NavItem>
          <NavItem>Upload</NavItem>
        </Flex>
        <Flex
          alignItems="center"
          mr={4}
          my={-1}
          style={{ border: "1px solid #ddd", borderRadius: 10 }}
        >
          <Flex p={2} flexDirection="row" alignItems="center" my={0}>
            <img style={{ width: 40 }} src={brawlstars} />
            <Box ml={3} ml={2}></Box>
            <Box mt={1} mr={2}>
              <FontAwesomeIcon icon={faChevronDown} color="rgba(0,0,0,0.7)" />
            </Box>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Box style={{ height: 35, width: 35 }}>
            <img
              style={{ width: 35, height: 35, borderRadius: 25 }}
              src={avatar}
            />
          </Box>
          <Box mx={2} mr={3}>
            <Name>morrissey</Name>
          </Box>
          <Box mt={1}>
            <FontAwesomeIcon icon={faChevronDown} color="rgba(0,0,0,0.7)" />
          </Box>
        </Flex>
      </Flex>
      <Flex px={3}>
        {[
          "Home",
          "Characters",
          "Pins",
          "Backgrounds",
          "Portraits",
          "Game UI",
          "3D models",
          "Map Banners"
        ].map(subnav => (
          <Box
            style={{ position: "relative" }}
            pb={3}
            mr={3}
            onClick={() => {
              if (navToPath[subnav]) {
                history.push(navToPath[subnav]);
              }
            }}
          >
            <Text>{subnav}</Text>
            {activeSubnav === subnav && (
              <Box
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 5,
                  background: "#4832DC"
                }}
              />
            )}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Header;
