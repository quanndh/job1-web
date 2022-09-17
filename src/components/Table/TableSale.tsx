import React from "react";
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
  Stack,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import CountDown from "../CountDown";
import { BsStop } from "react-icons/bs";

interface TableSaleProps {
  data: any[];
}

export const TableSale: React.FC<TableSaleProps> = (props) => {
  const { data } = props;

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption className="space-x-4">
            <Button colorScheme="teal" size="sm">
              SELECT BNB 0 BALANCE
            </Button>
            <Button colorScheme="teal" size="sm">
              <AiOutlineDelete className="mr-2" />
              DELETE SELECTED
            </Button>
            <Button colorScheme="teal" size="sm">
              <BsStop className="mr-2" />
              STOP ALL
            </Button>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>
                <Checkbox />
              </Th>
              <Th>Address</Th>
              <Th>Balance</Th>
              <Th>Presale contract</Th>
              <Th>Amount</Th>
              <Th>Start at</Th>
              <Th>Countdown</Th>
              <Th>Result</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item: any, index: number) => (
              <Tr>
                <Td>
                  <Checkbox />
                </Td>
                <Td>
                  <Link>
                    <Text color={useColorModeValue("teal", "teal.200")}>
                      Address
                    </Text>
                  </Link>
                </Td>
                <Td>Balance</Td>
                <Td>
                  <Link>
                    <Text color={useColorModeValue("teal", "teal.200")}>
                      Presale contract
                    </Text>
                  </Link>
                </Td>
                <Td>Amount</Td>
                <Td>Start at</Td>
                <Td>
                  <CountDown />
                </Td>
                <Td>
                  <Badge colorScheme="teal">Success</Badge>
                </Td>
                <Td>
                  <IconButton
                    colorScheme="teal"
                    icon={<AiOutlineDelete />}
                    aria-label={""}
                    marginRight={2}
                  />
                  <Button colorScheme="teal" size="sm">
                    BUY NOW
                  </Button>
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
