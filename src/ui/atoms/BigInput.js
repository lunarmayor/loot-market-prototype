import React from "react";
import { Box } from "../layouts";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Input = styled.input`
  width: 350px;
  padding: 14px 10px;
  padding-left: 46px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.2);
  font-size: 14px;
  background: black;
  color: white;
  outline: none;
  font-family: Source Code Pro;
  font-weight: 400;
  border-radius: 10px;
`;

const BigInput = props => {
  return (
    <Box style={{ position: "relative" }}>
      <Box style={{ position: "absolute", left: 15, top: 15 }}>
        <FontAwesomeIcon icon={faSearch} color="rgba(255,255,255,0.9)" />
      </Box>
      <Input {...props} />
    </Box>
  );
};

export default BigInput;
