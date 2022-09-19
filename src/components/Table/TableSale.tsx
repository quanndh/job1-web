import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Checkbox,
  IconButton,
  Button,
  Link,
  Badge,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import CountDown from "../CountDown";
import { BsStop } from "react-icons/bs";
import { Job } from "../../pages/PreSale/Sale";
import moment from "moment";
import BlockchainUtils from "../../uilts/Blockchain";

interface TableSaleProps {
  data: Job[];
  handleDelete: (id: number) => void;
}

export const TableSale: React.FC<TableSaleProps> = (props) => {
  const { data, handleDelete } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<any>();

  const [deleteId, setDeleteId] = useState<number>(-1);

  const renderStatus = (status: string) => {
    let color = "yellow";

    if (status === "Success") {
      color = "teal";
    }

    if (status === "Fail") {
      color = "red";
    }

    return <Badge colorScheme={color}>{status}</Badge>;
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Job
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete(deleteId);
                  onClose();
                  setDeleteId(-1);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <TableContainer>
        <Table variant="simple">
          {data.length ? (
            <TableCaption className="space-x-4">
              {/* <Button colorScheme="teal" size="sm">
                <AiOutlineDelete className="mr-2" />
                DELETE SELECTED
              </Button> */}
              <Button colorScheme="teal" size="sm">
                <BsStop className="mr-2" />
                STOP ALL
              </Button>
            </TableCaption>
          ) : null}

          <Thead>
            <Tr>
              {/* <Th>
                <Checkbox />
              </Th> */}
              <Th>Address</Th>
              <Th>Presale contract</Th>
              <Th>Amount</Th>
              <Th>Start at</Th>
              <Th>Countdown</Th>
              <Th>Result</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item: Job, index: number) => (
              <Tr key={`${item.contract}-${item.privateKey}`}>
                {/* <Td>
                  <Checkbox />
                </Td> */}
                <Td>
                  <Link
                    onClick={() =>
                      window.open(BlockchainUtils.explorerLink(item.address))
                    }
                  >
                    {" "}
                    <Text color={useColorModeValue("teal", "teal.200")}>
                      {BlockchainUtils.formatAddress(item.address)}
                    </Text>
                  </Link>
                </Td>
                <Td>
                  <Link
                    onClick={() =>
                      window.open(BlockchainUtils.explorerLink(item.contract))
                    }
                  >
                    <Text color={useColorModeValue("teal", "teal.200")}>
                      {BlockchainUtils.formatAddress(item.contract)}
                    </Text>
                  </Link>
                </Td>
                <Td>{item.value}</Td>
                <Td>
                  {moment(item.startAt * 1000).format("HH:mm:ss DD/MM/YYYY")}
                </Td>
                <Td>
                  <CountDown date={item.startAt * 1000} />
                </Td>
                <Td>{renderStatus(item.status)}</Td>
                <Td>
                  <IconButton
                    colorScheme="teal"
                    icon={<AiOutlineDelete />}
                    aria-label={""}
                    marginRight={2}
                    onClick={() => {
                      setDeleteId(item.id);
                      onOpen();
                    }}
                  />
                  {item.status === "Waiting" && (
                    <Button colorScheme="teal" size="sm">
                      BUY NOW
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableSale;
