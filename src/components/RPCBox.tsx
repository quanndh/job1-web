import { Box, Flex, Text, useDisclosure, FlexProps } from "@chakra-ui/react";
import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import SettingRPCModal from "./Modal/SettingRPCModal";

interface RPCBoxProps extends FlexProps {
  rpc: string;
}

export const RPCBox: React.FC<RPCBoxProps> = (props) => {
  const { rpc, ...rest } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        border="1px dashed #319795"
        borderRadius="md"
        marginBottom={4}
        cursor="pointer"
        flexDirection="row"
        alignItems="center"
        onClick={onOpen}
        {...rest}
      >
        <Flex w="32px" h="32px" justifyContent="center" alignItems="center">
          <AiOutlineSetting color="#319795" className="w-6 h-6" />
        </Flex>
        <Text padding={1}>{rpc}</Text>
      </Flex>
      <SettingRPCModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default RPCBox;
