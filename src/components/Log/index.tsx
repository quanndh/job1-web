import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import LogItem from "./LogItem";

const logs = [
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
  {
    id: 1,
    timestamp: "03:23:02 444",
    type: "Warning",
    error: "Alert: Amount is ZERO",
  },
];

interface LogProps {}

export const Log: React.FC<LogProps> = (props) => {
  const {} = props;

  return (
    <Flex
      marginTop={4}
      bg={useColorModeValue("gray.100", "gray.700")}
      p={2}
      borderRadius="md"
      maxH="280px"
      flexDirection="column"
      overflow="auto"
    >
      {logs.map((log, index) => (
        <LogItem key={index} item={log} />
      ))}
    </Flex>
  );
};

export default Log;
