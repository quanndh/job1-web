import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface LogItemProps {
  item: any;
}

export const LogItem: React.FC<LogItemProps> = (props) => {
  const {} = props;

  return (
    <Flex h="fit-content" mb={2} className="space-x-2" fontSize="sm">
      <Text>03:23:02 444</Text>
      <Text
        color={useColorModeValue("#e4c61c", "#ffbd06")}
        children={"[Warning]"}
      />
      <Text>Alert: Amount is ZERO</Text>
    </Flex>
  );
};

export default LogItem;
