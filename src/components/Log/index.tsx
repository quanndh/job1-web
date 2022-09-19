import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Log as ILog } from "../../uilts/Log";
import LogItem from "./LogItem";

interface LogProps {
  logs: ILog[];
}

export const Log: React.FC<LogProps> = ({ logs }) => {
  return (
    <Flex
      marginTop={4}
      bg={useColorModeValue("gray.100", "gray.700")}
      p={2}
      borderRadius="md"
      minH="280px"
      maxH="280px"
      flexDirection="column"
      overflow="auto"
    >
      {logs
        ? logs.map((log, index) => <LogItem key={index} item={log} />)
        : null}
    </Flex>
  );
};

export default Log;
