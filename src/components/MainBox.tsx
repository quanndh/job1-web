import { Box, FlexProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface MainBoxProps extends FlexProps {
  content: string | JSX.Element;
}

export const MainBox: React.FC<MainBoxProps> = (props) => {
  const { content, className, ...rest } = props;

  return (
    <Box
      bg={useColorModeValue("white", "")}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={8}
      p={4}
      {...rest}
    >
      {content}
    </Box>
  );
};

export default MainBox;
