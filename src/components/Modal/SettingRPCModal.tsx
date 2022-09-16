import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Input,
  useColorModeValue,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import React from "react";

interface SettingRPCModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingRPCModal: React.FC<SettingRPCModalProps> = (props) => {
  const { isOpen, onClose } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text fontSize="12px" marginBottom={2} fontWeight="bold">
              RPC Node*
            </Text>
            <Editable
              placeholder="Input RPC Node"
              value="https://bsc-dataseed.binance.org"
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingRPCModal;
