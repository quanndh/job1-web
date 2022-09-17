import { Box, FlexProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface MainBoxProps extends FlexProps {}

export const MainBox: React.FC<MainBoxProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <Box
      bg={useColorModeValue("white", "")}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={8}
      px={4}
      py={8}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default MainBox;
