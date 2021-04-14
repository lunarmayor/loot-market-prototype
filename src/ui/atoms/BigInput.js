import React from "react";
import { Box } from "../layouts";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  padding-left: 48px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-family: SupercellText;
  border-radius: 100px;
`;

const BigInput = props => {
  return (
    <Box style={{ position: "relative" }}>
      <Box style={{ position: "absolute", left: 20, top: 15 }}>
        <FontAwesomeIcon icon={faSearch} color="rgba(0,0,0,0.7)" />
      </Box>
      <Input {...props} />
    </Box>
  );
};

export default BigInput;
