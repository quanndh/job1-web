import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { Log } from "../../uilts/Log";

interface LogItemProps {
  item: Log;
}

export const LogItem: React.FC<LogItemProps> = ({ item }) => {
  const renderType = (type: string) => {
    let color = useColorModeValue("#e4c61c", "#ffbd06");

    if (type === "Success") {
      color = useColorModeValue("teal", "teal.200");
    }

    if (type === "Error") {
      color = "red";
    }
    return <Text color={color} children={`[${type}]`} />;
  };

  return (
    <Flex h="fit-content" mb={2} className="space-x-2" fontSize="sm">
      <Text>{moment(item.timestamp).format("HH:mm:ss SSS")}:</Text>
      {renderType(item.type)}
      <Text>{item.content}</Text>
    </Flex>
  );
};

export default LogItem;
