import React from "react";
import { Flex, Box } from "../layouts";
import { P } from "../atoms";
import ReactHashAvatar from "react-hash-avatar";

const Owner = ({ address, name, large, ...props }) => {
  let size = large ? 25 : 20;

  return (
    <Flex alignItems="center" {...props}>
      <Box
        width={size}
        height={size}
        style={{ borderRadius: "50%", overflow: "hidden" }}
      >
        <ReactHashAvatar name={address} width={size} height={size} />
      </Box>
      <P ml={2} style={{ fontSize: large ? 18 : 14 }}>
        {name}
      </P>
    </Flex>
  );
};
export default Owner;
